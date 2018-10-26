const socketio = require('socket.io');
const io = socketio();
const socketAuthorization = require('../middleware/socketAuthorization');


const socketApi = {
    io
}

const Users = require('./libs/Users');
const Rooms = require('./libs/Rooms');
const Messages = require('./libs/Messages');

io.use(socketAuthorization);


const redisAdapter = require('socket.io-redis');

io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));


io.on('connection', (socket) => {
    console.log(`|------------------------------------------------------------------|`);
    console.log(`| A user logged in with name : ${socket.request.user.name} |`);
    console.log(`|------------------------------------------------------------------|`);




    Users.list(onlineUsers => {
        io.emit('onlineList', onlineUsers);
    });

    Users.upsert(socket.id, socket.request.user);

    Rooms.list(rooms => {
        io.emit('roomList', rooms);
    });

    socket.on('newRoom', roomName => {
        Rooms.upsert(roomName);
        Rooms.list(rooms => {
            io.emit('roomList', rooms);
        });
    });

    socket.on('newMessage', (data) => {
        Messages.upsert({
            username: socket.request.user.name,
            surname: socket.request.user.surname,
            ...data
        });
    });



    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleId);

        Users.list(onlineUsers => {
            io.emit('onlineList', onlineUsers);
        });
    });
});

module.exports = socketApi;