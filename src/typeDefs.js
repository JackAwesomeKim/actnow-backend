const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query{
        getMessages(roomId: String!): [MessageWithUserEmail!]
        ping: String
        hello(name: String): String
        users: [User!]
        getUsers: [User!]
        usersInRoom(roomId: String): [User!]
        roomInUsers(roomId: String): [String!]
        RoomsOfOneUser(roomId: String): [String!]
        rooms: [Room!]
        roomsWithUsers: [UsersInRooms]
        getRoomsUserBelongsTo(userId: String!): [RoomsUserBelongsTo]
    }
    type RoomsUserBelongsTo{
        _id: ID!
        roomId: String
        userId: String
        room: Room
    }
    type UsersInRooms{
        _id: ID!
        roomId: String
        userId: String
        nestedUsers: User
    }
    type RoomsWithUsers{
        _id: ID!
        roomId: String
        userId: String
        rooms: Room
    }
    type User {
        _id: ID!
        userName: String!
        email: String!
    }
    type Error {
        field: String!
        message: String!
    }
    type Response {
        errors: [Error!]
        user: User
    }
    input UserInfo {
        userName: String!
        email: String!
    }
    type Mutation{
        ping:String
        addMessage(roomId:String!, addedMessage:AddedMessage!): Message!
        register(userInfo: UserInfo): User!
        login(userInfo: UserInfo!): User
        createRoom(roomName: String!, userIds:[String!]!): String!
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
    type MessageWithUserEmail{
        _id: ID!
        roomId: String!
        userId: String!
        content: String!
        user: User!
    }
    input AddedMessage{
        roomId: String!
        userId: String!
        content: String!
    }
    type Subscription {
        test: String
        pingSent: String
        simpleMessageAdded(roomId: String!): Message
        getUsers: [User!]!
        onUserAdded: User
        getMessages: [String]
        newUser: User!
        newMessage: [Message!]
    }
`

module.exports = typeDefs