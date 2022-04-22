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
}
const UsersInRooms = mongoose.model('UsersInRooms', schema);
module.exports = UsersInRooms;