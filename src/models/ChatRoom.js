const mongoose = require('mongoose');
const schema = {
    managerId: {
        type: String,
        required: true,
    },
    applicantId: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const ChatRoom = mongoose.model('ChatRoom', schema);
module.exports = ChatRoom;