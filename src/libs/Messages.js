const shortId = require('short-id');
const redisClient = require('../redisClient');
const _ = require('lodash');

function Messages() {
  this.client = redisClient.getClient();
}

Messages.prototype.upsert = function ({ userId, username, surname, message, roomId }) {

  this.client.hset(
    `messages${roomId}`,
    shortId.generate(),
    JSON.stringify({
      userId,
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

Messages.prototype.list = function (roomId, callback) {
  const messageList = [];
  setTimeout(() => {
    this.client.hgetall(`messages${roomId}`, function (err, messages) {
      if (err) return callback([]);
      for (let message in messages) {
        messageList.push(JSON.parse(messages[message]));
      }
      return callback(_.orderBy(messageList, 'when', 'asc'));
    });
  }, 2000);


};


module.exports = new Messages();
