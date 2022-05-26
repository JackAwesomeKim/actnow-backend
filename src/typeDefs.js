const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        ping: String!
    }
    type Subscription {
        pingSent: String
    }
`;

module.exports = typeDefs;