const Message = require('../models/Message');
const getChatRoomMessages = async ( roomId ) => {
    return Message.aggregate([
        { "$match" : { "roomId" : roomId }},
        { "$lookup": {
            "let": { "userObjId": { "$toObjectId": "$userId" } },
            "from": "users",
            "pipeline": [
                { "$match": { "$expr": { "$eq": [ "$_id", "$$userObjId" ] } } }
            ],
            "as": "user"
        }},
        { $unwind : "$user" }
    ]);
}

module.exports = getChatRoomMessages;