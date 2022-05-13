const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schedule = require('@/models/Schedule');

const Mutation = {
    createSchedule: async (_, { scheduleInput }) => {
//     scheduleInput.applyId:     String!,
//     scheduleInput.title:       String!,
//     scheduleInput.startTime:   Date!,
//     scheduleInput.endTime:     Date!,
//     scheduleInput.locationUrl: String!
        const schedule = new Schedule(scheduleInput);
        await schedule.save();
        return true;
    }
}



module.exports = { Mutation };