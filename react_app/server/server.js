const express = require("express")
const app = express()
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql")

const schema = require('./Schemas')

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

//serving react static files
app.use(express.static("build"))

//graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.get('/', (req, res) => {
    res.send("hello w")
})


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

app.get("/api/items", (req, res) => {
    // console.log(req.headers.host.split(".")[1])
    const domain = req.headers.host.split(".")[1]
    if (domain === "domain1")
        res.send(domain1);
    else
        res.send(domain2)
})

