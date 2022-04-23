const { mergeTypeDefs } = require('@graphql-tools/merge');
const userType = require('./userType');
const chatType = require('./chatType');
const castingNoticeType = require('./castingNoticeType');

const types = [userType, chatType, castingNoticeType];

module.exports = mergeTypeDefs(types);