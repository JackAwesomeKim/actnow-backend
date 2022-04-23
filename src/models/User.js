const mongoose = require('mongoose');
const schema = {
    userName: {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    userType : {
        type : String,
        required: true
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const User = mongoose.model('User', schema);
module.exports = User;