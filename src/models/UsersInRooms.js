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
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const UsersInRooms = mongoose.model('UsersInRooms', schema);
module.exports = UsersInRooms;