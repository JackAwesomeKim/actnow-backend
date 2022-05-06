const mongoose = require('mongoose');
const schema = {
    email: {
        type : String,
        required: true,
        unique : true
    },
    token : {
        type : String,
        required: true
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const Token = mongoose.model('Token', schema);
module.exports = Token;