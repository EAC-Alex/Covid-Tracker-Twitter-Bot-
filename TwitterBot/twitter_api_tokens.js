require('dotenv').config({ path: __dirname + '/./../.env' })

module.exports = {
    // All these values can be found in the details of your twitter developper account
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
}