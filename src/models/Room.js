const mongoose = require('mongoose');
const schema = {
    roomName: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const Room = mongoose.model('Room', schema);
module.exports = Room;