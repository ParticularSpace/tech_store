import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { typeDefs, resolvers } from './graphql';

// Load environment variables
dotenv.config();

// Check for required environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env variable');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create an Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let userId = null;

    const token = req.headers.authorization?.split(' ')[1];  // Extracts "Bearer <token>"

    if (token) {
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        userId = decoded.userId;
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
    // Add the user ID to the context
    return { userId, req };
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
