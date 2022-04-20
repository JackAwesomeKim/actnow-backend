const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        pong: String
    }
`

module.exports = typeDefs