const graphql = require("graphql");
const PostType = require("./TypeDefs/PostType");
const UserType = require("./TypeDefs/UserType");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = graphql;

const { getConnectionObject } = require('../db-models');
const { logger } = require("../winston-customLogging.js");

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const getDomain = (context) => {
    const { headers } = context
    // for localhost testing
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
    // console.log("==============all posts=====", posts)
    return posts
}

const getOnePost = async (whereCondition, domain) => {
    const db = await getConnectionObject(domain)
    const Post = db.posts
    const post = Post.findOne({ where: whereCondition })
    return post
}

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllAuthors: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                console.log("Inside getAllAuthors`` resolver", domain)
                return "userData";
            },
        },
        getAllPosts: {
            type: new GraphQLList(PostType),
            args: {},
            async resolve(parent, args, context) {

                const domain = getDomain(context)
                // console.log("=================DOMAIN===========", domain)
                let allPosts = getAllPosts(domain)
                // console.log("===========wait for 5 seconds========")
                await sleep(5000)
                // console.log("=====Posts data=====", allPosts)
                return allPosts

            },
        },
        getPost: {
            type: PostType,
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args, context) {

                const domain = getDomain(context)
                logger.log({ level: "info", message: `=======Domain is============ ${domain}` })

                const where = { ...args }
                let post = await getOnePost(where, domain)

                logger.log({ level: "info", message: `wait for 5 seconds in ${domain}` })

                await sleep(5000)

                logger.log(
                    {
                        level: "info",
                        message: {
                            post_data: `=====Posts data for ${domain} =====`,
                            post_title: post.dataValues.title, time: new Date().toLocaleTimeString('en-US')
                        }
                    })

                return post
            }
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createNewPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                rating: { type: GraphQLInt },

            },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                return createNewPost(args, domain)
            },
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: GraphQLInt },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                rating: { type: GraphQLInt },

            },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                return updatePost(args, domain)
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });