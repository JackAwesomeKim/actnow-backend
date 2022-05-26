const ChatRoom = require('@/models/ChatRoom');
const Message = require('@/models/Message');
const User = require('@/models/User');
const getMessages = require('@/mongooseDocuments/getMessages');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const PING_SUBSCRIPTION = "PING_SUBSCRIPTION";

const Query = {
    pong: () => {
        pubsub.publish(PING_SUBSCRIPTION, {
            pingSent: 'ping sent'
        });
        return 'ping sent';
    },
    getChatRoomInfo: async ( _, { userInfo, participantId } ) => {
        const user = await User.findOne({email: userInfo.email});
        let chatRoom;
        if(user.userType==="P")
            chatRoom = await ChatRoom.findOne({ managerId: userInfo._id, applicantId: participantId });
        else
            chatRoom = await ChatRoom.findOne({ managerId: participantId, applicantId: userInfo._id });
        if(!chatRoom) return null;
        return chatRoom._id;
    },
    getMessages: async ( _, { roomId } ) => {
        const messages = await getMessages(roomId);
        return messages;
    },
};

const Mutation = {
    createChatRoom: async ( _, { managerId, applicantId } ) => {
        const chatRoom = new ChatRoom({ managerId:managerId, applicantId:applicantId });
        await chatRoom.save();
        return true;
    },
    addMessage: async ( _, { roomId, userId, content } ) => {
        const chatRoom = new Message({
            roomId: roomId,
            userId: userId,
            content: content
         });
        await chatRoom.save();
        return true;
    },
}

const Subscription = {
    pingSent: {
        subscribe: () => pubsub.asyncIterator(PING_SUBSCRIPTION),
    },
}

const MessageWithUserInfo = {
    user: (parent) => parent.user
};

module.exports = { Query, Mutation, Subscription, MessageWithUserInfo };