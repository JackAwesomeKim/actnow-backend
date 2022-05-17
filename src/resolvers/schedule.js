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
    //add a schedule
    testMutation: async (_, { scheduleInput }) => {
        const schedule = new Schedule({...scheduleInput});
        schedule.save();
        return true;
    },
    createSchedule: async (_, { scheduleInput }) => {
        return true;
    },
    deleteSchedule: async (_, { noticeId, applyId }) => {
        console.log('******* deleteSchedule *******');
        await Schedule.deleteOne(
            { noticeId: noticeId },
            { applyId: applyId },
        );
        return true;
    },
    editSchedule: async (_, { noticeId, applyId, scheduleInput }) => {
        console.log('******* editSchedule *******');
        const filter = { 
            noticeId: noticeId,
            applyId: applyId,
        };
        const opts = { upsert: true };

        //update refresh token in the mongoDB
        await Schedule.findOneAndUpdate(filter, {...scheduleInput}, opts);
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