const mongoose = require('mongoose');
const schema = {
    noticeId: {
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

const Apply = mongoose.model('Apply', schema);
module.exports = Apply;