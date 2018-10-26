const redisClient = require('../redisClient');


function Users() {
  this.client = redisClient.getClient();
}

Users.prototype.upsert = function(connectionId, meta) {
  this.client.hset(
    "online",
    meta.googleId,
    JSON.stringify({
      connectionId,
      meta,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err);
    }
  );
};

Users.prototype.remove = function(googleId) {
  this.client.hdel("online", googleId, err => {
    if (err) console.error(err);
  });
};

Users.prototype.list = function(callback) {
  const active = [];
  this.client.hgetall("online", function(err, users) {
    if (err) return callback([]);
    for (let user in users) {
      active.push(JSON.parse(users[user]));
    }
    return callback(active);
  });
};

module.exports = new Users();
