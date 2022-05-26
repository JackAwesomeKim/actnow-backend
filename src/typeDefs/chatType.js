const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    type Query{
        pong: String
        getChatRoomInfo(userInfo: UserInfo!, participantId: String!): String
        getMessages(roomId: String!): [MessageWithUserInfo!]
    }
    type Mutation{
        createRoom(roomName: String!, userIds:[String!]!): String!
        createChatRoom(managerId:String!, applicantId:String!): Boolean
        addMessage(roomId:String!, userId:String!, content:String!): Boolean
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
    type MessageWithUserInfo{
        _id: ID!
        roomId: String!
        userId: String!
        content: String
        createdTime: Date!
        user: User!
    }
    
`;

module.exports = typeDefs;