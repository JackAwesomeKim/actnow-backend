const Schedule = require("../models/Schedule");
const getScheduleWithApplyDocument = async (noticeId, d1, d2) => {
    return Schedule.aggregate([
        { "$match": { 
            "$expr": {
                "$and": [
                    { "noticeId" : noticeId },
                    { "$lt": [ "$startTime", new Date(d2) ] },
                    { "$gte": [ "$startTime", new Date(d1) ] }
                ]
            }
        }},
        {
            "$lookup": {
                "let": {
                    "applyObjId": { "$toObjectId": "$applyId" },
                },
                "from": "applies",
                "pipeline": [
                    { "$match": { "$expr": { "$eq": [ "$_id", "$$applyObjId" ]}}},
                    {
                        "$lookup": {
                            "let": {
                                "applicantObjId": { "$toObjectId": "$applicantId" },
                            },
                            "from": "users",
                            "pipeline": [
                                { "$match": { "$expr": { "$eq": [ "$_id", "$$applicantObjId" ]}}}
                            ],
                            "as": "userInfo"
                        }
                    },
                    { $unwind : "$userInfo" }
                ],
                "as": "applyInfo"
            }
        },
        { $unwind : "$applyInfo" }
    ]);
}

module.exports = getScheduleWithApplyDocument;