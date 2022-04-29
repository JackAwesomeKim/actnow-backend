const UsersInRooms = require('../models/UsersInRooms');
const getRoomsUserBelongsTo = async (userId) => {
    return UsersInRooms.aggregate([
        { "$match" : { "userId" : userId }},
        { "$lookup": {
                "let": {
                    "roomObjId": { "$toObjectId": "$roomId" },
                },
                "from": "rooms",
                "pipeline": [
                    { "$match": { "$expr": { "$eq": [ "$_id", "$$roomObjId" ]}}}
                ],
                "as": "room"
        }},
        { $unwind : "$room" }
    ]);

}

module.exports = getRoomsUserBelongsTo;