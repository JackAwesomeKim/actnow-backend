const { withFilter } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');

const Message = require('./models/Message');
const Room = require("./models/Room");
const User = require('./models/User');
const UsersInRooms = require("./models/UsersInRooms");
const Token = require("./models/Token");

const mongoose = require('mongoose');

const getRoomsUserBelongsTo = require("./mongooseDocuments/getRoomsUserBelongsTo");
const getMessages = require("./mongooseDocuments/getMessages");
const { generateId } = require('./utils.js');
const { pubsub } = require('./apolloServer');

const GET_USERS = "GET_USERS";
const NEW_USER = "NEW_USER";
const NEW_MESSAGE = "NEW_MESSAGE";
const NEW_ROOM = "NEW_ROOM";
const GET_MESSAGES = "GET_MESSAGES";
const USER_SUBSCRIPTION = "USER_SUBSCRIPTION";
const MESSAGE_ADDED = "MESSAGE_ADDED";
const SIMPLE_MESSAGE_ADDED = "SIMPLE_MESSAGE_ADDED";
const PING_SUBSCRIPTION = "PING_SUBSCRIPTION";

const resolvers = {
    Query: {
        getMessages: async (_, { roomId } ) => await getMessages(roomId),
        ping: () => {
            return 'ping sent'
        },
        getUsers: async () => await User.find(),
        hello: async (parent, { name }) => {
            const messages = await Message.find();
            return `hey ${name}`;
        },
        users: async () => {
            const users = await User.find();
            return await User.find();
        },
        rooms: async () => await Room.find(),
        roomsWithUsers: async () => {
            const usersInRooms = await UsersInRooms.aggregate([
                { "$lookup": {
                    "let": { "userObjId": { "$toObjectId": "$userId" } },
                    "from": "users",
                    "pipeline": [
                      { "$match": { "$expr": { "$eq": [ "$_id", "$$userObjId" ] } } }
                    ],
                    "as": "nestedUsers"
                }},
                { $unwind : "$nestedUsers" }
            ]);
            return usersInRooms;
        },
        getRoomsUserBelongsTo: async (_, { userId }, context, info) => {
            const getRooms = await getRoomsUserBelongsTo(userId);
            return getRooms;
        }
    },
    UsersInRooms: {
        nestedUsers: (parent) => parent.nestedUsers
    },
    RoomsUserBelongsTo: {
        room: (parent) => parent.room
    },
    RoomsWithUsers: {
        rooms: (parent) => parent.rooms
    },
    MessageWithUserEmail: {
        user: (parent) => parent.user
    },
    Mutation: {
        login: async ( _, { userInfo }, { req, res, pubsub, setHeaders} ) => {
            const user = await User.findOne({ 
                                        userName: userInfo.userName, 
                                        email: userInfo.email 
                                    });
            /* if a user doesn't exist, return null */
            if(!user) return null;
            /* if a user exist, issue a token for user */
            //access token

            const accessToken = jwt.sign(
                { email: userInfo.email },
                  process.env.ACCESS_TOKEN_SECRET_KEY, {
                  expiresIn: process.env.ACCESS_EXPIRES_IN,
            });

            //refresh token
            const refreshToken = jwt.sign(
                { email: userInfo.email },
                  process.env.REFRESH_TOKEN_SECRET_KEY, {
                  expiresIn: process.env.REFRESH_EXPIRES_IN,
            });

            //set Authorization header with the newly generated access token.
            setHeaders.push({ key: "Authorization", value: accessToken });

            const filter = { email: userInfo.email };
            const update = { token: refreshToken };
            const opts = { new: true, upsert: true };

            //update refresh token in the mongoDB
            await Token.findOneAndUpdate(filter, update, opts);
            return user;
        },
        register: async (_, { userInfo }) => {
            // const user = new User({ ...userInfo })
            // await user.save()
            // const users = await User.find()
            const newUser = {
                id: generateId(),
                ...userInfo,
            }
            return newUser
        },
        addMessage: async (_, {roomId, addedMessage}, {req, res, setHeaders}, info) => {
            const newMessage = {
                _id: new mongoose.Types.ObjectId(),
                ...addedMessage
            }
            pubsub.publish(SIMPLE_MESSAGE_ADDED, {
                roomId: roomId,
                simpleMessageAdded: newMessage
            });
            const message = new Message({...newMessage});
            await message.save();
            return newMessage
        },
        createRoom: async (_, {roomName, userIds}) => {
            const roomId = generateId()
            let room = new Room({
                id: roomId,
                roomName: roomName,
            });
            await room.save();
            return roomId;
        },
    },
    Subscription: {
        pingSent: {
            subscribe: () => pubsub.asyncIterator(PING_SUBSCRIPTION),
        },
        simpleMessageAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(SIMPLE_MESSAGE_ADDED),
                (payload, variables) => {
                  // Only push an update if the comment is on
                  // the correct users in for this operation
                  return (payload.simpleMessageAdded.roomId === variables.roomId);
                },
            ),
        },
        getMessages: {
            subscribe: (_, __) => pubsub.asyncIterator(GET_MESSAGES),
        },
        newUser: { 
            subscribe: (_, __,) => pubsub.asyncIterator(NEW_USER)
        },
        newMessage: {
            subscribe: (_, __,) => pubsub.asyncIterator(NEW_MESSAGE)
        },
        onUserAdded: {
            subscribe: (_, __,) => pubsub.asyncIterator(USER_SUBSCRIPTION)
        }
    },
}

module.exports = resolvers;