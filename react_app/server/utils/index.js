const jsonwebtoken = require("jsonwebtoken");
const { jwt_secrets } = require("../config/env-config");
const verifyJWT = async (token, domain) => {
    let userObj;
    try {
        userObj = jsonwebtoken.verify(token, jwt_secrets[domain]);
    }
    catch (err) {
        console.log("Error ", err)
        userObj = false;
    }
    return userObj;
}
async function authMiddleware(req, res, next) {
    // res.json({data:"token missing"})
    console.log(req.host)
    const domain = req.host.split(".")[1]
    console.log(req.headers.authorization)
    if (req.headers.authorization === undefined)
        res.json({ data: "token no present" })
    else {
        userData = await verifyJWT(req.headers.authorization.split(" ")[1], domain)
        console.log("userData is ", userData)
        req.userData = userData
        req.domain_name = domain
        next()
    }
}

module.exports={authMiddleware}