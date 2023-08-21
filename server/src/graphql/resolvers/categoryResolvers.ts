import { Category } from '../../models/Category';

export const categoryResolvers = {
  Query: {
    categories: () => Category.find(),
  },
  // Other category-related resolvers
};
