const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        getSchedules(applyId: String!): [Schedule!]
        getScheduleWithApply(applyId: String!): Boolean!
    }
    type Mutation{
        createSchedule(scheduleInput: ScheduleInput!): Boolean!
    }
    type Schedule{
        _id:         ID!
        title:       String!
        startTime:   Date!
        endTime:     Date!
        locationUrl: String!
    }
    type ScheduleWithApply{
        _id: ID!
        applyId: String!
        title: String!
        startTime: Date!
        endTime: Date!
        locationUrl: String!
        createdTime: Date!
        applyInfo: ApplyInfo!
    }
    type ApplyInfo {
        _id: ID!
        noticeId: String!
        applicantId: String!
        progressOrder: Int!
        createdTime: Date!
        userInfo: UserInfoForSchedule!
    }
    type UserInfoForSchedule{
        _id: ID!
        userName: String!
        email: String!
        userType: String!
    }
    input ScheduleInput{
        applyId:     String!
        title:       String!
        startTime:   Date!
        endTime:     Date!
        locationUrl: String!
    }
`;

module.exports = typeDefs;