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


const { logger } = require("../winston-customLogging.js");
const { updatePost, createNewPost, sleep, getOnePost, getDomain, getAllPosts, createJWT } = require("./utils");

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
                // console.log(Object.keys(context))
                const { userData, domain_name } = context
                const domain = getDomain(context)
                let allPosts = getAllPosts(domain_name)
                await sleep(5000)
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
        signInUser: {
            type: UserType,
            args: {
                userName: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args, context) {
                const { userName, password } = args
                const domain = getDomain(context)
                const token = createJWT({ userName, password }, domain)
                // console.log("token is ", token)
                return { id: 1234, userName, token }
            }
        },
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