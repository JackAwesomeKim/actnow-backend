const mongoose = require('mongoose');
const schema = {
    managerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const CastingNotice = mongoose.model('CastingNotice', schema);
module.exports = CastingNotice;