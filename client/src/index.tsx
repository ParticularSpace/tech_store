import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.css";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './redux/store'; // Import your Redux store

// Create an HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create a middleware for adding the token to requests
const authLink = setContext((_, { headers }) => {
  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('auth_token');
  
  // Add the token to the headers, or leave it as is
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Create an Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the middleware to the HTTP link
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}> {/* Wrap your App with Provider and pass the Redux store */}
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
