const { mergeResolvers } = require("@graphql-tools/merge");
const chat = require('./chat');
const user = require('./user');
const castingNotice = require('./castingNotice');
const { date } = require('./scalars');
const resolvers = [
    chat, user, castingNotice, {...date}
];

module.exports = mergeResolvers(resolvers);
