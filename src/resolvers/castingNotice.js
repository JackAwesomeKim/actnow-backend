const CastingNotice = require('@/models/CastingNotice');
const getApplicantList = require("@/mongooseDocuments/getApplicantList");
const Apply = require('@/models/Apply');
const NoticeProgressInfo = require('@/models/NoticeProgressInfo');
const getNoticeProgressInfo = require('@/mongooseDocuments/getNoticeProgressInfo');

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
        console.log('noticeProgressInfo');
        console.log(noticeProgressInfo);
        return noticeProgressInfo;
    },
};

const Mutation = {
    createNotice: async ( _, { notice } ) => {
        const castingNotice = new CastingNotice({...notice});
        await castingNotice.save();
        return true;
    },
    applyNotice: async ( _, { noticeId, userId, progressOrder } ) => {
        const apply = new Apply({ noticeId:noticeId, applicantId:userId, progressOrder: progressOrder });
        await apply.save();
        return true;
    },
    createOrModifyNoticeProgressInfo: async ( _, { noticeId, progressOrders, progressOrderNames } ) => {
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
    
}

const ApplicantList = {
    user: (parent) => parent.user
};

const NoticeProgressInfoWithApplicants = {
    applicants: (parent) => {
        console.log("****** applicants parent ******");
        console.log(parent);
        return parent.applicants
    }
    
};

const ApplyWithUserInfo = {
    userInfo: (parent) => {
        console.log("****** userInfo parent ******");
        console.log(parent);
        return parent.userInfo
    }
}

module.exports = { 
    Query, Mutation, 
    ApplicantList, NoticeProgressInfoWithApplicants,
    ApplyWithUserInfo
};