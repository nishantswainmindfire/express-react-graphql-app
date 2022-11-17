const jsonwebtoken = require("jsonwebtoken");
const { jwt_secrets } = require("../config/env-config");


const getDomain = (context) => {
    const { headers } = context
    const isLocalhost = headers.host.includes("localhost")
    if (isLocalhost)
        return "domain1"

    const domain = headers.host.split(".")[1]
    return domain
}

const verifyJWT = async (token, domain) => {
    let userObj;
    try {
        userObj = jsonwebtoken.verify(token, jwt_secrets[domain]);
    }
    catch (err) {
        // console.log("Error ", err)
        userObj = false;
    }
    return userObj;
}
async function authMiddleware(req, res, next) {
    const domain = getDomain(req)
    //   return next()
    // console.log(req.headers.authorization)
    if (req.headers.authorization === undefined)
        res.json({ data: "token not present" })
    else {

        const token = req.headers.authorization.split(" ")[1]
        console.log("========= token is =========\n", token,"\n")
        userData = await verifyJWT(token, domain)
        console.log("======= userData from token is =======\n", userData)
        req.userData = userData
        req.domain_name = domain
        next()
    }
}

module.exports = { authMiddleware }