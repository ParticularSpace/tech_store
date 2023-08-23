import React from "react";

import App from "./App";
import "./tailwind.css";

import { createRoot } from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")!); // notice the '!'
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
