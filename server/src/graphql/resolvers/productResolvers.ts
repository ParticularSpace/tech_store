// server/src/graphql/resolvers/productResolvers.ts

import { Product } from '../../models/Product';

export const productResolvers = {
  Query: {
    getProduct: async (_: any, { id }: { id: string }) => {
      return await Product.findById(id);
    },
    getProducts: async () => {
      return await Product.find();
    },
  },
  Mutation: {
    createProduct: async (_: any, { input }: { input: any }) => {
      return await Product.create(input);
    },
    // Add other mutations for updating, deleting products
  },
  // Add field resolvers if needed
};
