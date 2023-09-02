// server/src/graphql/resolvers/categoryResolvers.ts

import { Category } from '../../models/Category';

export interface CategoryInput {
  name: string;
  description?: string;
}


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
    createNewCategory: async (_: any, { input }: { input: CategoryInput }) => {
      const newCategory = new Category(input);
      const category = await newCategory.save();
      return category;
    },
    updateCategory: async (_: any, { id, input }: { id: string, input: any }) => {
      return await Category.findByIdAndUpdate(id, input, { new: true });
    },
    removeCategory: async (_: any, { id }: { id: string }) => {
      const result = await Category.findByIdAndDelete(id);
      return !!result;
    },
  },
};
