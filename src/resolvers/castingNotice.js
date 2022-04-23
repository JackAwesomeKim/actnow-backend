const mongoose = require('mongoose');
const CastingNotice = require('@/models/CastingNotice');
const Apply = require('../models/Apply');

const Query = {
    getNoticeList: async ( _, { managerId } ) => {
        const castingNotices = await CastingNotice.find({ managerId: managerId });
        return castingNotices;
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

module.exports = { Query, Mutation };