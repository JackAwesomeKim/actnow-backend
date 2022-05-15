const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schedule = require('@/models/Schedule');
const getScheduleWithApplyDocument = require('@/mongooseDocuments/getScheduleWithApplyDocument');
const Query = {
    getSchedules: async (_, { applyId }) => {
        const schedules = await Schedule.find({ applyId: applyId });
        return schedules;
    },
    getScheduleWithApply: async (_, { noticeId, selectedDate }) => {

        const d1 = new Date(selectedDate);
        var day = 60 * 60 * 24 * 1000;

        // Create new Date instance
        const d2 = new Date(d1.getTime() + day);
        const getScheduleWithApply = await getScheduleWithApplyDocument(noticeId, d1, d2);
        return getScheduleWithApply;
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

const ApplyInfoInSchedule = {
    userInfo: (parent) => parent.userInfo
}

module.exports = { 
    Query, Mutation,
    ScheduleWithApply, ApplyInfoInSchedule
};