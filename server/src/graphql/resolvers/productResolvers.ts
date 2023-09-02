// server/src/graphql/resolvers/productResolvers.ts

import { Product }  from '../../models/Product';

export interface DimensionsInput {
  length: number;
  width: number;
  height: number;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  discountAmount?: number;
  category: string;
  quantity: number;
  stockStatus: string;
  sku: string;
  imgUrl: string;
  dimensions: DimensionsInput;
  weight: number;
  manufacturer: string;
}



export const productResolvers = {
  Query: {
    getProduct: async (_: any, { id }: { id: string }) => {
      return await Product.findById(id);
    },
    getAllProducts: async () => {
      try {
        return await Product.find({});
      } catch (err) {
        console.error("Error fetching products:", err);
        return [];
      }
    },
    searchProducts: async (_: any, { searchTerm }: { searchTerm: string }) => {
      try {
        return await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
      } catch (err) {
        console.error("Error fetching search results:", err);
        return [];
      }
    },
  },
  Mutation: {
    createNewProduct: async (_: any, { input }: { input: ProductInput }) => {
      const newProduct = new Product(input);
      const product = await newProduct.save();
      return product;
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

