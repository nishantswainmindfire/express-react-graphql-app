const express = require("express")
const app = express()
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql")
//see if the hosting service has assigned the port
//else use 8080.
const PORT = process.env.PORT || 8080;

const domain1 = {
    siteName: "domain1",
    title: "domain 1 title",
    siteDescription: "dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
    date: new Date().toString()
}

const domain2 = {
    siteName: "domain2",
    title: "domain 2 title",
    siteDescription: "kjnjdsnjbdb djbb dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
    date: new Date().toString()
}
app.listen(PORT, () => console.log("Server started"));

//serving react static files
app.use(express.static("build"))
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLInt },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    }),
  });
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {

            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parent,args,context){
                console.log("args")
                console.log("context")
            }
        }
    }
})
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
//graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.get('/', (req, res) => {
    res.send("hello w")
})
app.get("/api/items", (req, res) => {
    // console.log(req.headers.host.split(".")[1])
    const domain=req.headers.host.split(".")[1]
    if(domain==="domain1")
    res.send(domain1);
    else
    res.send(domain2)
})

