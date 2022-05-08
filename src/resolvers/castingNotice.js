const CastingNotice = require('@/models/CastingNotice');
const getApplicantList = require("@/mongooseDocuments/getApplicantList");
const Apply = require('@/models/Apply');
const NoticeProgressInfo = require('@/models/NoticeProgressInfo');
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
        const noticeProgressInfo = await NoticeProgressInfo.find({ noticeId: noticeId });
        return noticeProgressInfo;
    },
};

const Mutation = {
    createNotice: async ( _, { notice } ) => {
        const castingNotice = new CastingNotice({...notice});
        await castingNotice.save();
        return true;
    },
    applyNotice: async ( _, { noticeId, userId } ) => {
        const apply = new Apply({ noticeId:noticeId, applicantId:userId });
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

module.exports = { Query, Mutation, ApplicantList };