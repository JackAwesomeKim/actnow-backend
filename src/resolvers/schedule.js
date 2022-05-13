const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schedule = require('@/models/Schedule');
const getScheduleWithApplyDocument = require('@/mongooseDocuments/getScheduleWithApplyDocument');
const Query = {
    getSchedules: async (_, { applyId }) => {
        const schedules = await Schedule.find({ applyId: applyId });
        return schedules;
    },
    getScheduleWithApply: async (_, { applyId }) => {
        const getScheduleWithApply = await getScheduleWithApplyDocument(applyId);
        return true;
    },
};

const Mutation = {
    createSchedule: async (_, { scheduleInput }) => {
        const schedule = new Schedule(scheduleInput);
        await schedule.save();
        return true;
    }
};

const ScheduleWithApply = {
    applyInfo: (parent) => parent.applyInfo
};

const ApplyInfo = {
    userInfo: (parent) => parent.userInfo
}

module.exports = { 
    Query, Mutation,
    ScheduleWithApply, ApplyInfo
};