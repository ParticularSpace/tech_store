import mongoose from 'mongoose';

const dimensionsSchema = new mongoose.Schema({
  length: Number,
  width: Number,
  height: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  discountAmount: Number,
  category: String,
  quantity: Number,
  stockStatus: String,
  sku: String,
  imgUrl: String,
  dimensions: dimensionsSchema,
  weight: Number,
  manufacturer: String,
});

export const Product = mongoose.model('Product', productSchema);
