const socketio = require('socket.io');
const io = socketio();
const socketAuthorization = require('../middleware/socketAuthorization');


const socketApi = {
    io
}

const Users = require('./libs/Users');

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
    Users.upsert(socket.id, socket.request.user);
});

module.exports = socketApi;