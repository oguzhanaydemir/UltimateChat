const socketio = require('socket.io');
const io = socketio();
const redisAdapter = require('socket.io-redis');
const socketAuthorization = require('../middleware/socketAuthorization');


const socketApi = {
    io
}

io.use(socketAuthorization);

io.adapter(redisAdapter({
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT
}));

io.on('connection', (socket) => {
    console.log('a user logged in with name ', socket.request.user.name);

    socket.broadcast.emit('hello', { text: 'hello' });
});

module.exports = socketApi;