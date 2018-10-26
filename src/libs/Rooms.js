const redisClient = require('../redisClient');


function Rooms() {
  this.client = redisClient.getClient();
}

Rooms.prototype.upsert = function(roomName) {
  this.client.hset(
    "rooms",
    roomName,
    JSON.stringify({
      roomName,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err);
    }
  );
};

Rooms.prototype.list = function(callback) {
  const roomList = [];
  this.client.hgetall("rooms", function(err, rooms) {
    if (err) return callback([]);
    for (let room in rooms) {
      roomList.push(JSON.parse(rooms[room]));
    }
    return callback(roomList);
  });
};



module.exports = new Rooms();
