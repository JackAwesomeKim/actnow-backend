const jwt = require('jsonwebtoken');
const Token = require('@/models/Token');

async function publishNewRefreshToken(userInfo){

    //refresh token
    const refreshToken = await jwt.sign(
        { email: userInfo.email },
            process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: process.env.REFRESH_EXPIRES_IN,
    });

    const { iat, exp } = jwt.decode(refreshToken);
    const validTimePeriod = exp - iat;

    // update refresh token in the mongoDB

    const filter = { email: userInfo.email };
    const update = { token: refreshToken };
    const opts = { new: true, upsert: true };

    await Token.findOneAndUpdate(filter, update, opts);
    return validTimePeriod;
    

}


async function publishNewAccessToken(userInfo){
    const accessToken = await jwt.sign(
        { email: userInfo.email },
            process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: process.env.REFRESH_EXPIRES_IN,
    });
    console.log('-- new access token was published --');
    return accessToken;
}

module.exports = { publishNewRefreshToken, publishNewAccessToken }