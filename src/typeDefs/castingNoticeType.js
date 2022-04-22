const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        getNoticeList(managerId:String!): [CastingNotice!]
    }
    type Mutation{
        login(userInfo: UserInfo!): User
        register(userInfo: UserInfo): User
    }
    type CastingNotice{
        _id: ID!
        managerId: String!
        title: String!
        detail: String
    }
`

module.exports = typeDefs