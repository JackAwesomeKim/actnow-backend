const { pubsub } = require('./apolloServer');
const PING_SUBSCRIPTION = "PING_SUBSCRIPTION";
const resolvers = {
    Query: {
        ping: () => {
            pubsub.publish(PING_SUBSCRIPTION, {
                pingSent: 'ping sent'
            });
            return 'ping sent';
        }
    },
    Subscription: {
        pingSent: {
            subscribe: () => pubsub.asyncIterator(PING_SUBSCRIPTION),
        },
    }
}

module.exports = resolvers;