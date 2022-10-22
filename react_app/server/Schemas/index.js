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
    const domain = headers.host.split(".")[1]
    return domain
}
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllAuthors: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                console.log("Inside getAllUsers resolver", domain)
                return "userData";
            },
        },
        getAllPosts: {
            type: new GraphQLList(PostType),
            args: { post_id: { type: GraphQLInt } },
            resolve(parent, args) {
                return "postsData";
            },
        },
        getPost: {
            type: PostType,
            args: { post_id: { type: GraphQLInt } },
            resolve(parent, args, context) { }
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                rating: { type: GraphQLInt },

            },
            resolve(parent, args, context) {
                const domain = getDomain(context)
                console.log("domain is", domain)
                return args;
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });