// server/src/graphql/resolvers/categoryResolvers.ts

import { Category } from '../../models/Category';

export const categoryResolvers = {
  Query: {
    getCategory: async (_: any, { id }: { id: string }) => {
      return await Category.findById(id);
    },
    getCategories: async () => {
      return await Category.find();
    },
  },
  Mutation: {
    createCategory: async (_: any, { input }: { input: any }) => {
      return await Category.create(input);
    },
    // Add other mutations for updating, deleting categories
  },
  // Add field resolvers if needed
};
