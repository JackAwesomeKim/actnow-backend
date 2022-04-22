const { mergeResolvers } = require("@graphql-tools/merge");
const message = require('./message');
const user = require('./user');
const castingNotice = require('./castingNotice');

const resolvers = [
    message, user, castingNotice
];

module.exports = mergeResolvers(resolvers);
