
const mongoose = require('mongoose');
const schema = {
    applyId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    locationUrl: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: () => new Date(),
    }
}

const Schedule = mongoose.model('Schedule', schema);
module.exports = Schedule;