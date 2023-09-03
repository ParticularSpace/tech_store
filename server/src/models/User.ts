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
);

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  imgUrl: {type: String, required: false},
},
 { _id: false });

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
  cart: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
