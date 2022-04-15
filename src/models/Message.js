const mongoose = require('mongoose');
const schema = {
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const Message = mongoose.model('Message', schema);
module.exports = Message