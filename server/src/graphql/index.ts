import { userTypeDefs } from './typeDefs/userSchema';
import { productTypeDefs } from './typeDefs/productSchema';
import { categoryTypeDefs } from './typeDefs/categorySchema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { userResolvers } from './resolvers/userResolvers';
import { productResolvers } from './resolvers/productResolvers';
import { categoryResolvers } from './resolvers/categoryResolvers';

// Combine all type definitions
export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  productTypeDefs,
  categoryTypeDefs,
]);

// Combine all resolvers
export const resolvers = mergeResolvers([
  userResolvers,
  productResolvers,
  categoryResolvers,
]);
