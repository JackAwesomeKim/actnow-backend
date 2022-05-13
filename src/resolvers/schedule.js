const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schedule = require('@/models/Schedule');

const Query = {
    getSchedules: async (_, { applyId }) => {
        const schedules = await Schedule.find({ applyId: applyId });
        return schedules;
    }
};

const Mutation = {
    createSchedule: async (_, { scheduleInput }) => {
        const schedule = new Schedule(scheduleInput);
        await schedule.save();
        return true;
    }
};



module.exports = { Query, Mutation };