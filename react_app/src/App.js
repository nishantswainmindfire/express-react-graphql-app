
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
  from,
  useMutation
} from '@apollo/client';
import { ErrorLink, onError } from '@apollo/client/link/error'
import PostList from './components/PostList';
import { CREATE_NEW_POST } from './GraphQL/Mutations/PostMutations';

function App() {
  // const [createPost, { error }] = useMutation(CREATE_NEW_POST)

  // const addPost = () => {
  //   createPost({
  //     variables: {
  //       title: "title",
  //       description: "description",
  //       rating: "rating"
  //     }
  //   })
  // }



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
  const hostName=window.location.hostname

  // const host = `www.domain2.com:8080`
  const link = from([
    errorLink,
    new HttpLink({ uri: `http://${hostName}:8080/graphql` })
  ])
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
  })
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

