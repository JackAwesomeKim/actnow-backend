const ChatRoom = require('@/models/ChatRoom');
const Message = require('@/models/Message');
const User = require('@/models/User');
const getMessages = require('@/mongooseDocuments/getMessages');
const Query = {
    pong: () => 'ping',
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

const MessageWithUserInfo = {
    user: (parent) => {
        console.log("**** MessageWithUserInfo ****");
        return parent.user;
    }
};

module.exports = { Query, Mutation, MessageWithUserInfo };