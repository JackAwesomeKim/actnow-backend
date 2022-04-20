const { mergeTypeDefs } = require('@graphql-tools/merge');
const userType = require('./userType');
const messageType = require('./messageType');

const types = [userType, messageType];

module.exports = mergeTypeDefs(types);