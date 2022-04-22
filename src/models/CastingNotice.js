const mongoose = require('mongoose');
const schema = {
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const CastingNotice = mongoose.model('CastingNotice', schema);
module.exports = CastingNotice;