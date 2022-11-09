
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useMutation,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink, onError } from '@apollo/client/link/error'
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import { Button, TextField } from '@mui/material';
import { SIGN_IN_USER } from './GraphQL/Mutations/UserMutations';
import LoginForm from './components/LoginForm';

// import { useMutation } from '@apollo/client';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const mlt_token = localStorage.getItem('mlt-token')
    if (mlt_token !== undefined && mlt_token !== "")
      setIsLoggedIn(true)
  }, [])

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
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('mlt-token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  const link = from([
    errorLink,
    new HttpLink({
      uri: `http://${hostName}:8080/graphql`, headers: () => {
        return { authorization: `Bearer ${localStorage.getItem('mlt-token')}` }
      }
    })
  ])
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link)
  })

  const logoutHandler=()=>{
    localStorage.setItem("mlt-token","")
    setIsLoggedIn(false)
  }
  return (
    <ApolloProvider client={client}>
      {!isLoggedIn && <LoginForm setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && (<><div className='heading'>
        <h2>Host is, {window.location.host.split(":")[0]}</h2>
        <div className='logout-button'>
          <Button variant='contained' color='primary' onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
        <div className="app">
          <CreatePost />
          <PostList />
        </div></>)}
    </ApolloProvider>
  );
}

export default App;

