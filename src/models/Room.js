const mongoose = require('mongoose');
const schema = {
    roomName: {
        type: String,
        required: true,
    }
}
const Room = mongoose.model('Room', schema);
module.exports = Room;