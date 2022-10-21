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



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args,context) {
              console.log(args,)
            //   console.log(context))
            const domain = context.headers.host.split(".")[1]
            console.log("Inside getAllUsers resolver",domain)   
            return "userData";
            },
        },
        getAllPosts:{
            type:new GraphQLList(PostType),
            args: { post_id: { type: GraphQLInt } },
            resolve(parent, args) {
                return "postsData";
            },
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                });
                return args;
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });