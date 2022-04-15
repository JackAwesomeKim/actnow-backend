const { ApolloServer, gql } = require("apollo-server-express");
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const createApolloServer = (schema) => {
    return new ApolloServer({
      schema,
      context: ({ req, res, connection }) => {
        return {
          req, 
          res, 
          setCookies: new Array(),
          setHeaders: new Array()
        };
      },
      subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
          console.log('subscriptions - onConnect');
        },
      },
      plugins: [httpHeadersPlugin],
    });
}


module.exports = { pubsub, createApolloServer };