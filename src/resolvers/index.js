const { mergeResolvers } = require("@graphql-tools/merge");
const chat = require('./chat');
const user = require('./user');
const castingNotice = require('./castingNotice');
const { date } = require('./scalars');
const resolvers = [
    chat, user, castingNotice, {...date}
];

console.log('***** mergeResolvers *****');
console.log(mergeResolvers(resolvers));
console.log('***** mergeResolvers *****');

module.exports = mergeResolvers(resolvers);
