const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Mutation{
        createSchedule(
            applyId:     String!,
            title:       String!,
            startTime:   Date!,
            endTime:     Date!,
            locationUrl: String!
        ): Boolean!
    }
    type Schedule{
        _id:         ID!
        title:       String!
        startTime:   Date!
        endTime:     Date!
        locationUrl: String!
    }
    input ScheduleInput{
        _id:         ID!
        title:       String!
        startTime:   Date!
        endTime:     Date!
        locationUrl: String!
    }

`;

module.exports = typeDefs;