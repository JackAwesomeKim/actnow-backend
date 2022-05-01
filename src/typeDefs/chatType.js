const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        pong: String
    }
    type Mutation{
        createRoom(roomName: String!, userIds:[String!]!): String!
        createChatRoom(managerId:String!,applicantId:String!): Boolean
        getChatRoomInfo(userInfo: UserInfo!, participantId: String!): String
    }
    type Room {
        _id: ID!
        roomName: String!
    }
    type Message{
        _id: ID!
        roomId: String!
        userId: String!
        content: String!
    }
`;

module.exports = typeDefs;