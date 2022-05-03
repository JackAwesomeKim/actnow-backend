const { ApolloServer, gql } = require("apollo-server-express");
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const createApolloServer = (schema, serverCleanup, httpServer) => {
    return new ApolloServer({
      schema,
      context: ({ req, res, connection }) => {
        console.log('in the apollo server context');
        console.log(req.cookies);
        console.log(req.headers.cookie);
        return {
          req, 
          res, 
          setCookies: new Array(),
          setHeaders: new Array()
        };
      },
      plugins: [
        httpHeadersPlugin,
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
    
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });
}


module.exports = { pubsub, createApolloServer };