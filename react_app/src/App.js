
import './App.css';
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from, F
} from '@apollo/client';
import { ErrorLink, onError } from '@apollo/client/link/error'
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
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
  const hostName = window.location.hostname
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
        <CreatePost />
        <PostList />
      </div>
    </ApolloProvider>
  );
}

export default App;

