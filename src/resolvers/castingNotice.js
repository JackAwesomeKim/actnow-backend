const mongoose = require('mongoose');
const CastingNotice = require('@/models/CastingNotice');

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
    }
    
}

module.exports = { Query, Mutation };