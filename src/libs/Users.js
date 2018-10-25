const redis = require('redis');

function Users() {
	this.client = new redis.createClient(
		{
			host: process.env.REDIS_URI,
			port: process.env.REDIS_PORT
		});
}

Users.prototype.upsert = function (connectionId, meta) {
	this.client.hset(
		'online',
		meta.googleId,
		JSON.stringify({
			connectionId,
			meta,
			when: Date.now()

		})
	);
}

module.exports = new Users();