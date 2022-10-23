
import './App.css';
import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client';
import { ErrorLink, onError } from '@apollo/client/link/error'


const errorLink = onError(({ graphqlErrors, networkError }) => {
  console.log("network error ", networkError)
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" })
])
const client = new ApolloClient({
  cache: {},
  link: link
})
function App() {
  const [siteState, setSiteState] = useState({})

  useEffect(() => {

    fetch("/api/items").
      then(res => res.json()).
      then(data => setSiteState(data))

  }, [])
  function renderState() {
    if (siteState)
      return JSON.stringify(siteState)
  }
  return (
    <ApolloProvider client={client}>
      <div className="App">
        Hello World
        <Button>Material Button</Button>
        {/* {renderState()} */}
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={siteState.image ? siteState.image : "https://images8.alphacoders.com/127/1274206.jpg"}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Black Adam

            </Typography>
            <Typography variant="body2" color="text.secondary">
              King of kandak
              {renderState()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </ApolloProvider>
  );
}

export default App;
