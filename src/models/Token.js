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
    }
}
const Token = mongoose.model('Token', schema);
module.exports = Token;