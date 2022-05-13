const { mergeResolvers } = require("@graphql-tools/merge");
const chat = require('./chat');
const user = require('./user');
const castingNotice = require('./castingNotice');
const { date } = require('./scalars');
const schedule = require('./schedule');

const resolvers = [
    chat, user, castingNotice, {...date}, schedule
];

module.exports = mergeResolvers(resolvers);
