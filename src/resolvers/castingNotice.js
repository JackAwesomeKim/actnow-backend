const mongoose = require('mongoose');

const CastingNotice = require('@/models/CastingNotice');


const Query = {
    getNoticeList: async ( _, { userId } ) => {
        const castingNotices = await CastingNotice.find({ managerId: userId });
        return castingNotices;
    }
};

module.exports = { Query };
