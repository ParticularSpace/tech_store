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
    updateProduct: async (_: any, { id, input }: { id: string, input: any }) => {
      return await Product.findByIdAndUpdate(id, input, { new: true });
    },
    removeProduct: async (_: any, { id }: { id: string }) => {
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    },
  },

};

