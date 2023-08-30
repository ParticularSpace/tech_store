import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  quantity: { type: Number, required: true },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Discontinued"],
  },
  discountPercentage: Number,
  discountAmount: Number,
  tags: [String],
  isActive: { type: Boolean, default: true },
  images: [String], // URLs to product images
  sku: { type: String, unique: true }, // Stock Keeping Unit
  manufacturer: String,
  weight: Number, // Weight, useful for shipping calculations
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  }, // Product dimensions
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
    },
  ], // User ratings and reviews
  isFeatured: { type: Boolean, default: false }, // Featured products
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
