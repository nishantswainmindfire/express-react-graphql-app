
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
import PostList from './components/PostList';

const errorLink = onError(({ graphqlErrors, networkError }) => {

  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
  if (networkError) {
    console.log("=========network error======== ", networkError)
  }
})
// const host=window.location.host
const host = `www.domain2.com:8080`
const link = from([
  errorLink,
  new HttpLink({ uri: `http://${window.location.host}/graphql` })
])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})
function App() {

  return (
    <ApolloProvider client={client}>
      <div className='heading'>

        <h2>Host is, {window.location.host.split(":")[0]}</h2>
      </div>
      <div className="app">
        <PostList />
      </div>
    </ApolloProvider>
  );
}

export default App;

