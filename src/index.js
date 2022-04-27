const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const resolvers = require("./resolvers/index");
const typeDefs = require("./typeDefs/index");
const { createServer } = require('http');
const { WebSocketServer } = require("ws");
const mongoose = require('mongoose');
const { createApolloServer } = require('./apolloServer');

const PORT = process.env.PORT || 8001;

require('dotenv').config();

(async () => {
  await mongoose.connect('mongodb://localhost:27017/test');

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const corsOptions = {
    origin: '*', //for now at least, for testing purposes,
    credentials: true,
    exposedHeaders: ['Authorization'],
  };
  const express = require('express');
  const app = express();

  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  
  const serverCleanup = useServer({ schema }, wsServer);
  // const apolloServer = createApolloServer(schema);
  const apolloServer =createApolloServer(schema, serverCleanup, httpServer);

  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/' });
  // apolloServer.installSubscriptionHandlers(httpServer);
  
  httpServer.listen(PORT, ()=>{
    console.log(`*** backend server ***`);
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.graphqlPath}`);  
  });
})();
