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
    progressStage: {
        type: Number,
        required: true,
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}

const ApplicantProgressInfo = mongoose.model('ApplicantProgressInfo', schema);
module.exports = ApplicantProgressInfo;