const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis')
const pubsub = new RedisPubSub({
    connection: {
        host: 'localhost',
        port: 6379,
        retry_strategy: options => Math.max(options.attempt * 100, 3000),
    },
});

module.exports = pubsub;
