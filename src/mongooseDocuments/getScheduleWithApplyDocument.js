const Schedule = require("../models/Schedule");
const getScheduleWithApplyDocument = async (applyId) => {
    return Schedule.aggregate([
        { "$match" : { "applyId" : applyId }},
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