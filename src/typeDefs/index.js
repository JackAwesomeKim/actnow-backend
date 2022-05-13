const { mergeTypeDefs } = require('@graphql-tools/merge');
const userType = require('./userType');
const chatType = require('./chatType');
const castingNoticeType = require('./castingNoticeType');
const scheduleType = require('./scheduleType');

const types = [userType, chatType, castingNoticeType, scheduleType];

module.exports = mergeTypeDefs(types);