import { Product } from '../models/Product';
import { Category } from '../models/Category';

export const addProduct = async (name: string, price: number, category: string, quantity: number) => {
  const newProduct = new Product({ name, price, category, quantity });
  await newProduct.save();
};

export const addCategory = async (name: string) => {
  const newCategory = new Category({ name });
  await newCategory.save();
};

// Other inventory management functions
