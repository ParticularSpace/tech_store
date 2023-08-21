import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import { productResolvers } from './graphql/resolvers/productResolvers';
import { categoryResolvers } from './graphql/resolvers/categoryResolvers';
import { typeDefs } from './graphql/schema'; // You'll need to define your GraphQL schema in this file
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...productResolvers,
    ...categoryResolvers,
  },
});

// Start the Apollo Server
server.start().then(() => {
  // Apply Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
});
