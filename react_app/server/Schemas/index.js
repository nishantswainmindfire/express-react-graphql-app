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
// const userData = require("../MOCK_DATA.json");
const connectionObjects = require('../db-models')

const getDomain = (context) => {
    const { headers } = context
    const isLocalhost = headers.host.includes("localhost")
    if (isLocalhost)
        return "domain1"
    const domain = headers.host.split(".")[1]
    return domain
}

const createNewPost = async (requestData, domain) => {
    const db = connectionObjects[domain]
    const Post = db.posts
    const post = await Post.create(requestData)
    return post
}

const getAllPosts = async (domain) => {
    const db = connectionObjects[domain]
    const Post = db.posts
    const posts = await Post.findAll({
        attributes: [
            "id",
            "title",
            "description",
            "rating"
        ]
    })
    // console.log("==============all posts=====", posts)
    return posts
}

const getOnePost = async (whereCondition, domain) => {
    const db = connectionObjects[domain]
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
            args: {
                // post_id: { type: GraphQLInt } 
            },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                return getAllPosts(domain)
            },
        },
        getPost: {
            type: PostType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args, context) {

                const domain = getDomain(context)
                const where = { ...args }
                return getOnePost(where, domain)
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
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });