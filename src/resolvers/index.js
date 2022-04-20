const { mergeResolvers } = require("@graphql-tools/merge");
const message = require('./message');
const user = require('./user');

const resolvers = [
    message, user
];

module.exports = mergeResolvers(resolvers);
