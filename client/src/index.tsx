import React from "react";
import App from "./App";
import "./tailwind.css";

import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

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

const root = createRoot(document.getElementById("root")!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
