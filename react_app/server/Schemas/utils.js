

const { getConnectionObject } = require('../db-models');
const jsonwebtoken = require('jsonwebtoken');
const { domain1Secret, jwt_secrets } = require('../config/env-config');

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const getDomain = (context) => {
    const { headers } = context
    const isLocalhost = headers.host.includes("localhost")
    if (isLocalhost)
        return "domain1"

    const domain = headers.host.split(".")[1]
    return domain
}

const createNewPost = async (requestData, domain) => {
    const db = await getConnectionObject(domain)
    const Post = db.posts
    const post = await Post.create(requestData)
    return post
}

const updatePost = async (requestData, id, domain) => {
    const db = await getConnectionObject(domain)
    const Post = db.posts
    const post = await Post.update(requestData, { where: { id } })
    return post
}

const getAllPosts = async (domain) => {
    const timeStamp = new Date().toString()
    const db = await getConnectionObject(domain)
    const Post = db.posts
    const posts = await Post.findAll({
        attributes: [
            "id",
            "title",
            "description",
            "rating"
        ]
    })
    posts.forEach(element => {
        element.date = timeStamp
    });
    return posts
}

const getOnePost = async (whereCondition, domain) => {
    const db = await getConnectionObject(domain)
    const Post = db.posts
    const post = Post.findOne({ where: whereCondition })
    return post
}

const createJWT = (userObj, domain) => {
    const secret = jwt_secrets[domain]
    console.log("secret is", secret)
    return jsonwebtoken.sign(userObj, secret, { expiresIn: '365d' })
}
module.exports = {
    getDomain,
    sleep,
    createNewPost,
    updatePost,
    getAllPosts,
    getOnePost,
    createJWT
}