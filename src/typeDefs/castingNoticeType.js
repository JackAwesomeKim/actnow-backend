const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        getNoticeList(managerId:String!): [CastingNotice!]
    }
    type Mutation{
        createNotice(notice: Notice!): Boolean!
        applyNotice(noticeId: String!, userId:String!): Boolean!
        
    }
    type CastingNotice{
        _id: ID!
        title: String!
        managerId: String!
        detail: String
    }
    input Notice{
        title: String!
        managerId: String!
    }
    type Apply{
        _id: ID!
        noticeId: String!
        applicantId: String!
    }
`;

module.exports = typeDefs;