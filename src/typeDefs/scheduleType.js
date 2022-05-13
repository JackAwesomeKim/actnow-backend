const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        getSchedules(applyId: String!): [Schedule!]
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
    input ScheduleInput{
        applyId:     String!
        title:       String!
        startTime:   Date!
        endTime:     Date!
        locationUrl: String!
    }

`;

module.exports = typeDefs;