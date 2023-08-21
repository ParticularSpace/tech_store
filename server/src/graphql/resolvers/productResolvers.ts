import { Product } from '../../models/Product';

export const productResolvers = {
  Query: {
    products: () => Product.find(),
  },
  // Other product-related resolvers
};
