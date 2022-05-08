const mongoose = require('mongoose');
const schema = {
    noticeId: {
        type: String,
        required: true
    },
    progressOrder: {
        type: Number,
        required: true
    },
    progressOrderName: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}
const NoticeProgressInfo = mongoose.model('NoticeProgressInfo', schema);
module.exports = NoticeProgressInfo;