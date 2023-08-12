import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs/typeDefs'; // Import your type definitions
import resolvers from './resolvers/resolvers'; // Import your resolvers
// import context from './context'; // Optional: Import context if you have set up

// Initialize the Apollo Server with type definitions, resolvers, and optional context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context, // Optional: Provide a function or object to set up context
});

// Start the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
