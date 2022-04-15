const { ApolloServer, gql } = require("apollo-server-express");
const { useServer} = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema} = require('@graphql-tools/schema');

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { createServer } = require('http');
const validateAuthorization = require('./validateAuthorization');
const mongoose = require('mongoose');
const { createApolloServer } = require('./apolloServer');

const PORT = process.env.PORT || 8001;

require('dotenv').config();

(async () => {
  await mongoose.connect('mongodb://localhost:27017/test');

  const corsOptions = {
    origin: '*', //for now at least, for testing purposes,
    credentials: true,
    exposedHeaders: ['Authorization'],
  };
  const express = require('express');
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = createApolloServer(schema);
  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/' });
  apolloServer.installSubscriptionHandlers(httpServer);
  
  httpServer.listen(PORT, ()=>{
    console.log(`*** backend server ***`);
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);  
  });
})();
