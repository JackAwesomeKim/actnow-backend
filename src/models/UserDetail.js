const mongoose = require('mongoose');
const schema = {
    userId: {
        type : String,
        required: true,
        unique: true
    },
    age: {
        type : Number,
    },
    height: {
        type : Number,
    },
    weight: {
        type : Number,
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const UserDetail = mongoose.model('UserDetail', schema);
module.exports = UserDetail;