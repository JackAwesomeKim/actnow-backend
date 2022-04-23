const { mergeResolvers } = require("@graphql-tools/merge");
const chat = require('./chat');
const user = require('./user');
const castingNotice = require('./castingNotice');

const resolvers = [
    chat, user, castingNotice
];

module.exports = mergeResolvers(resolvers);
