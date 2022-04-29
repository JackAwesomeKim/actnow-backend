const Apply = require('../models/Apply');
const getApplicantList = async ( noticeId ) => {
    return Apply.aggregate([
        { "$match" : { "noticeId" : noticeId }},
        { "$lookup": {
            "let": { "applicantObjId": { "$toObjectId": "$applicantId" } },
            "from": "users",
            "pipeline": [
                { "$match": { "$expr": { "$eq": [ "$_id", "$$applicantObjId" ] } } }
            ],
            "as": "user"
        }},
        { $unwind : "$user" }
    ]);
}

module.exports = getApplicantList;