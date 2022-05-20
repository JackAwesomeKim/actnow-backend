const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        getNoticeList(managerId:String!): [CastingNotice!]
        getApplicantList(noticeId:String!): [ApplicantList!]
        getNoticeProgressInfo(noticeId:String): [NoticeProgressInfoWithApplicants!]
    }
    type Mutation{
        createNotice(notice: Notice!): Boolean!
        applyNotice(noticeId: String!, userId:String! progressOrder: Int!): Boolean!
        createOrModifyNoticeProgressInfo(noticeId: String!, progressOrders:[Int!]! progressOrderNames: [String!]!): Boolean!
        updateApplies(applies: [ApplyInput!]): Boolean!
        updateNoticeProgressInfo(noticeProgressInfo: [NoticeProgressInfo!]): Boolean!
        deleteNoticeProgressInfo(noticeProgressInfo: NoticeProgressInfo!): Boolean!
    }
    type CastingNotice{
        _id: ID!
        title: String!
        managerId: String!
        detail: String
    }
    type ApplicantList{
        _id: ID!
        noticeId: String!
        user: User
    }
    input Notice{
        title: String!
        managerId: String!
    }
    type Apply{
        _id: ID!
        noticeId: String!
        applicantId: String!
        progressOrder: Int!
    }
    input ApplyInput {
        _id: String!
        noticeId: String!
        applicantId: String!
        progressOrder: Int!
        createdTime: String!
        userInfo: UserInfo!
    }
    type NoticeProgressInfoWithApplicants{
        _id: ID!
        noticeId: String!
        progressOrder: Int!
        progressOrderName: String!
        applicants: [ApplyWithUserInfo]
    }
    input NoticeProgressInfo{
        _id: String!
        noticeId: String!
        progressOrder: Int!
        progressOrderName: String!
    }
    type ApplyWithUserInfo{
        _id: ID!
        noticeId: String!
        applicantId: String!
        progressOrder: Int!
        createdTime: Date!
        userInfo: User
    }

    
`;

module.exports = typeDefs;