const express = require("express")
const app = express()
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql")
const connectionObjects=require('./db-models')
const schema = require('./Schemas')

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

//serving react static files
app.use(express.static("build"))

//graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    // context: { startTime: Date.now() },

}))
app.get('/x', (req, res) => {
    console.log("=================connectionObjects=========================",connectionObjects)
    res.send("hello w")
})


const domain1 = {
    siteName: "domain1",
    title: "domain 1 title",
    siteDescription: "dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
    date: new Date().toString(),
    image: "https://images8.alphacoders.com/127/1274206.jpg"
}

const domain2 = {
    siteName: "domain2",
    title: "domain 2 title",
    siteDescription: "kjnjdsnjbdb djbb dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
    date: new Date().toString(),
    image: "https://i.pinimg.com/736x/27/ea/1a/27ea1a6fe37145e27aa5fc7145da1309.jpg"
}

app.get("/api/items", (req, res) => {
    // console.log(req.headers.host.split(".")[1])
    const domain = req.headers.host.split(".")[1]
    if (domain === "domain1")
        res.send(domain1);
    else
        res.send(domain2)
})

