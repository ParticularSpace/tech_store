import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String, // Description of the category
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Parent category for nested categories
  image: String, // URL to an image representing the category
  slug: { type: String, unique: true }, // URL-friendly slug for routing
  isFeatured: { type: Boolean, default: false }, // Featured categories
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Category = mongoose.model('Category', categorySchema);
