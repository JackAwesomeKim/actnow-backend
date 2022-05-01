const ChatRoom = require('../models/ChatRoom');


const Query = {
    pong: () => 'ping'
};

const Mutation = {
    createChatRoom: async ( _, { managerId, applicantId } ) => {
        const chatRoom = new ChatRoom({ managerId:managerId, applicantId:applicantId });
        await chatRoom.save();
        return true;
    }
}
module.exports = { Query, Mutation };
