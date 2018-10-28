const socketio = require("socket.io");
const io = socketio();
const socketAuthorization = require("../middleware/socketAuthorization");

const socketApi = {
  io
};

const Users = require("./libs/Users");
const Rooms = require("./libs/Rooms");
const Messages = require("./libs/Messages");

io.use(socketAuthorization);

const redisAdapter = require("socket.io-redis");

io.adapter(
  redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
  })
);

io.on("connection", socket => {
  console.log(
    `|------------------------------------------------------------------|`
  );
  console.log(`| A user logged in with name : ${socket.request.user.name} |`);
  console.log(
    `|------------------------------------------------------------------|`
  );

  Users.upsert(socket.id, socket.request.user);

  Users.list(onlineUsers => {
    io.emit("onlineList", onlineUsers);
  });

  Rooms.list(rooms => {
    io.emit("roomList", rooms);
  });

  socket.on("newRoom", roomName => {
    Rooms.upsert(roomName);
    Rooms.list(rooms => {
      io.emit("roomList", rooms);
    });
  });

  socket.on("newMessage", data => {
    const messageData = {
      userId: socket.request.user._id,
      username: socket.request.user.name,
      surname: socket.request.user.surname,
      ...data
    };
    Messages.upsert(messageData);
    socket.broadcast.emit('receiveMessage', messageData);
  });

  socket.on("disconnect", () => {
    Users.remove(socket.request.user._id);

    Users.list(onlineUsers => {
      io.emit("onlineList", onlineUsers);
    });
  });
});

module.exports = socketApi;
