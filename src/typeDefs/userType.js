const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        ping: String
    }
    type Mutation{
        login(userInfo: UserInfo!): User
        register(userInfo: UserInfo): User
        verifyAccessToken(userInfo: UserInfo!): Boolean
        verifyRefreshToken(userInfo: UserInfo!): Int!
    }
    type User {
        _id: ID
        userName: String
        email: String
        userType: String
    }
    input UserInfo {
        _id:String
        userName: String!
        email: String!
        userType: String
    }
`;

module.exports = typeDefs;