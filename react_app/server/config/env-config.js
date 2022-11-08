require('dotenv').config();
// console.log("7888",process.env)
module.exports = {
    name: process.env.NAME,
    jwt_secrets: {
        domain1: process.env.DOMAIN1_SECRET,
        domain2: process.env.DOMAIN2_SECRET
    }
    // dbURL: process.env.DBURL,
    // port: process.env.PORT,
    // userAuthenticationSecret: process.env.USER_AUTHENTICATION_SECRET,
    // adminAuthenticationSecret: process.env.ADMIN_AUTHENTICATION_SECRET,
    // hotelUserAuthenticationSecret: process.env.HOTEL_USER_AUTHENTICATION_SECRET
}