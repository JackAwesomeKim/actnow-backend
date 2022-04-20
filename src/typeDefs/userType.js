const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        ping: String
    }
    type Mutation{
        login(userInfo: UserInfo!): User
        register(userInfo: UserInfo): User
    }
    type User {
        _id: ID!
        userName: String!
        email: String!
    }
    input UserInfo {
        userName: String!
        email: String!
    }
`

module.exports = typeDefs