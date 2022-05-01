const ChatRoom = require('@/models/ChatRoom');
const Message = require('@/models/Message');
const Query = {
    pong: () => 'ping'
};

const Mutation = {
    createChatRoom: async ( _, { managerId, applicantId } ) => {
        const chatRoom = new ChatRoom({ managerId:managerId, applicantId:applicantId });
        await chatRoom.save();
        return true;
    },
    getChatRoomInfo: async ( _, { userInfo, participantId } ) => {
        let chatRoom = null;
        if(userInfo.userType==="P")
            chatRoom = await ChatRoom.findOne({ managerId: userInfo._id, applicantId: participantId });
        else
            chatRoom = await ChatRoom.findOne({ managerId: participantId, applicantId: userInfo._id });
        if(!chatRoom) return null;
        return chatRoom._id;
    }
}
module.exports = { Query, Mutation };