const NoticeProgressInfo = require('../models/NoticeProgressInfo');
const getMessagesTest = async () => {
    return NoticeProgressInfo.aggregate([
        { "$match" : { "noticeId" : "62638b3b077467d392ba8ab9" }},
        { "$lookup": {
            // "let": { "noticeObjId": { "$toObjectId": "$noticeId" } },
            // "let": { "noticeIdFromFirstTable": "$noticeId" },
            "let": { 
                "noticeIdFromFirstTable": "$noticeId",
                "progressOrderFromFirstTable": "$progressOrder"
            },
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
                { "$lookup": {
                    "let": {
                        "applicantObjId": { "$toObjectId": "$applicantId" },
                    },
                    "from": "users",
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": [ "$_id", "$$applicantObjId" ]}}}
                    ],
                    "as": "userInfo"
                }},
            ],
            "as": "applicants"
        }},
    ]);
}

module.exports = getMessagesTest;