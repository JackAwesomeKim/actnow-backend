const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('@/models/User');
const Token = require('@/models/Token');
const { generateId } = require('@/utils');
const { publishNewRefreshToken, publishNewAccessToken } = require('@/functions/api');
const getMessagesTest = require('@/mongooseDocuments/mongooseTestDocuments');
const getMessages = require('@/mongooseDocuments/getMessages');

const Query = {
    ping: async ( ) => {
        return 'pong';
    }
};

const Mutation = {
    login: async ( _, { userInfo }, { req, res, pubsub, setHeaders, setCookies } ) => {

        setCookies.push({
            name: "fromResponse",
            value: "cookieContent",
            options: {
                path: "/",
            }
        });
        const user = await User.findOne({
                                    userName: userInfo.userName, 
                                    email: userInfo.email 
                     });

        /* if a user doesn't exist, return null */
        if(!user) return null;

        /* if a user exist, issue a token for user */
        //access token
        const accessToken = jwt.sign(
            { email: userInfo.email },
              process.env.ACCESS_TOKEN_SECRET_KEY, {
              expiresIn: process.env.ACCESS_EXPIRES_IN,
        });

        //refresh token
        const refreshToken = jwt.sign(
            { email: userInfo.email },
              process.env.REFRESH_TOKEN_SECRET_KEY, {
              expiresIn: process.env.REFRESH_EXPIRES_IN,
        });
        
        //set Authorization header with the newly generated access token.
        setHeaders.push({ key: "Authorization", value: accessToken });
        const filter = { email: userInfo.email };
        const update = { token: refreshToken };
        const opts = { new: true, upsert: true };

        //update refresh token in the mongoDB
        await Token.findOneAndUpdate(filter, update, opts);
        return user;
    },
    register: async (_, { userInfo }) => {
        const user = await User.findOne({email: userInfo.email});
        if(user) return null;

        const _newUser = {
            _id: new mongoose.Types.ObjectId(),
            ...userInfo,
        };
        const newUser = new User(_newUser);
        await newUser.save();
        return _newUser
    },
    verifyAccessToken: async (_, { userInfo }, __) => {
        const token = await publishNewAccessToken(userInfo);
        console.log(jwt.decode(token));
        return true;
    },
    verifyRefreshToken: async (_, { userInfo }, { req, res, pubsub, setHeaders }) => {
        const validTimePeriod = await publishNewRefreshToken(userInfo);
        return validTimePeriod;
    }
}

module.exports = { Query, Mutation };