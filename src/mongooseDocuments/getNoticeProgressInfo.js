const NoticeProgressInfo = require('../models/NoticeProgressInfo');
const getNoticeProgressInfo = async ( noticeId ) => {
    return NoticeProgressInfo.aggregate([
        { "$match" : { "noticeId" : noticeId }},
        { "$lookup": {
            // "let": { "noticeObjId": { "$toObjectId": "$noticeId" } },
            // "let": { "noticeIdFromFirstTable": "$noticeId" },
            "let": [
                { "noticeIdFromFirstTable": "$noticeId" },
                { "progressOrderFromFirstTable": "$progressOrder" },
            ],
            "from": "applies",
            "pipeline": [
                { "$match": 
                    { "$expr":
                        {   "$and": [
                                { "$eq": [ "$noticeId", "$$noticeIdFromFirstTable" ] },
                                { "$eq": [ "$progressOrder", "$$progressOrderFromFirstTable" ] }
                            ]
                        }
                    }
                },
            ],
            "as": "applicants"
        }},
        { $unwind : "$applicants" }
    ]);
}

module.exports = getNoticeProgressInfo;