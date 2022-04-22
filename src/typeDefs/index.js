const { mergeTypeDefs } = require('@graphql-tools/merge');
const userType = require('./userType');
const messageType = require('./messageType');
const castingNoticeType = require('./castingNoticeType');

const types = [userType, messageType, castingNoticeType];

module.exports = mergeTypeDefs(types);