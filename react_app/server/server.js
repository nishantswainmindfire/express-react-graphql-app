const express = require("express")
const app = express()
const { graphqlHTTP } = require("express-graphql")
const schema = require('./Schemas')
const cors = require('cors')
const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.use(cors())

app.use("*",(req,res,next)=>{
  next()
})

//serving react static files
app.use(express.static("build"))

//graphql integration
const extensions = ({
  document,
  variables,
  operationName,
  result,
  context,
}) => {
  return {
    host: context.rawHeaders[1],
  };
};
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true,
  extensions
  // context: { startTime: Date.now() },
}))


//other rest api's integration
// const domain1 = {
//   siteName: "domain1",
//   title: "domain 1 title",
//   siteDescription: "dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
//   date: new Date().toString(),
//   image: "https://images8.alphacoders.com/127/1274206.jpg"
// }

// const domain2 = {
//   siteName: "domain2",
//   title: "domain 2 title",
//   siteDescription: "kjnjdsnjbdb djbb dhfidsifdsbfbb dhbfdskfbn dnfkjdsbkjf",
//   date: new Date().toString(),
//   image: "https://i.pinimg.com/736x/27/ea/1a/27ea1a6fe37145e27aa5fc7145da1309.jpg"
// }

// app.get("/api/items", (req, res) => {
//   // console.log(req.headers.host.split(".")[1])
//   const domain = req.headers.host.split(".")[1]
//   if (domain === "domain1")
//     res.send(domain1);
//   else
//     res.send(domain2)
// })

