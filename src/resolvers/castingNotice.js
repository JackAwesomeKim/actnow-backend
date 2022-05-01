const CastingNotice = require('@/models/CastingNotice');
const getApplicantList = require("@/mongooseDocuments/getApplicantList");
const Apply = require('@/models/Apply');

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
}

const ApplicantList = {
    user: (parent) => parent.user
};

module.exports = { Query, Mutation, ApplicantList };