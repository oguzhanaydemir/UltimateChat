const shortId = require('short-id');
const redisClient = require('../redisClient');


function Messages() {
  this.client = redisClient.getClient();
}

Messages.prototype.upsert = function ({ username, surname, message, roomId }) {

  this.client.hset(
    `messages:${roomId}`,
    shortId.generate(),
    JSON.stringify({
      username,
      surname,
      message,
      when: Date.now()
    }),
    err => {
      if (err) console.error(err);
    }
  );

};


module.exports = new Messages();
