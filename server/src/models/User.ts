import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  { _id: false }
); // Embedded schema, so no need for an _id

const userSchema = new mongoose.Schema({
  password: { type: String, required: true }, // Consider hashing the password
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  profileImage: String, // URL to the profile image
  roles: [{ type: String, enum: ['USER', 'ADMIN'] }],
  addresses: [addressSchema], // Multiple addresses
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Wishlist products
  phoneNumber: String,
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtTime: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
