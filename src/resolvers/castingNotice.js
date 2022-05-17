const CastingNotice = require('@/models/CastingNotice');
const getApplicantList = require("@/mongooseDocuments/getApplicantList");
const Apply = require('@/models/Apply');
const NoticeProgressInfo = require('@/models/NoticeProgressInfo');
const getNoticeProgressInfo = require('@/mongooseDocuments/getNoticeProgressInfo');
const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

const Query = {
    getNoticeList: async ( _, { managerId } ) => {
        const castingNotices = await CastingNotice.find({ managerId: managerId });
        return castingNotices;
    },
    getApplicantList: async ( _, { noticeId } ) => {
        if(!noticeId) return [];
        const applicantList = await getApplicantList(noticeId);
        return applicantList;
    },
    getNoticeProgressInfo: async ( _, { noticeId } ) => {
        const noticeProgressInfo = await getNoticeProgressInfo(noticeId);
        return noticeProgressInfo;
    },
};

const Mutation = {
    testMutation: async (_, { scheduleInput }) => {
        const schedule = new Schedule({...scheduleInput});
        schedule.save();
        return true;
    },
    createNotice: async ( _, { notice } ) => {
        const castingNotice = new CastingNotice({...notice});
        await castingNotice.save();
        return true;
    },
    applyNotice: async ( _, { 
        noticeId, 
        userId, 
        progressOrder } ) => {
        const apply = new Apply({ noticeId:noticeId, applicantId:userId, progressOrder: progressOrder });
        await apply.save();
        return true;
    },
    createOrModifyNoticeProgressInfo: async ( _, { 
        noticeId, 
        progressOrders, 
        progressOrderNames } ) => {
        let noticeProgressInfo;
        for(let i=0; i<progressOrderNames.length; i++){
            noticeProgressInfo = new NoticeProgressInfo({ 
                noticeId:noticeId, 
                progressOrder:progressOrders[i], 
                progressOrderName:progressOrderNames[i]
            });
            await noticeProgressInfo.save();
        }
        return true;
    },
    updateNoticeProgressInfo: async ( _, { noticeProgressInfo } ) => {
        // NoticeProgressInfo
        let update, filter;
        const opts = { new: true, upsert: true };
        for(let i=0; i<noticeProgressInfo.length; i++){
            filter = { 
                _id :mongoose.Types.ObjectId(noticeProgressInfo[i]._id)
            };
            update = { 
                progressOrder: noticeProgressInfo[i].progressOrder, 
                progressOrderName: noticeProgressInfo[i].progressOrderName 
            };
            await NoticeProgressInfo.findOneAndUpdate(filter, update, opts);
        }
        return true;
    },
    updateApplies: async ( _, { applies } ) => {
        let update, filter;
        const opts = { new: true, upsert: true };
        for(let i=0; i<applies.length; i++){
            filter = { 
                _id :mongoose.Types.ObjectId(applies[i]._id)
            };
            update = { progressOrder: applies[i].progressOrder };
            await Apply.findOneAndUpdate(filter, update, opts);
        }
        return true;
    },
}

const ApplicantList = {
    user: (parent) => parent.user
};

const NoticeProgressInfoWithApplicants = {
    applicants: (parent) => parent.applicants    
};

const ApplyWithUserInfo = {
    userInfo: (parent) => parent.userInfo
}

module.exports = { 
    Query, Mutation, 
    ApplicantList, NoticeProgressInfoWithApplicants,
    ApplyWithUserInfo
};