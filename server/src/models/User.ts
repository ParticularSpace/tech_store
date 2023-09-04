import mongoose, { Schema, Document } from 'mongoose';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  imgUrl?: string;
}

interface IUser extends Document {
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  roles: Array<'USER' | 'ADMIN'>;
  addresses: Address[];
  wishList: Schema.Types.ObjectId[];
  phoneNumber?: string;
  cart: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  removeFromCart(productId: string): Promise<void>;
  populateCart(): Promise<void>;
}

const addressSchema = new Schema<Address>(
  {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  { _id: false }
);

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    imgUrl: { type: String, required: false },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  profileImage: String,
  roles: [{ type: String, enum: ['USER', 'ADMIN'] }],
  addresses: [addressSchema],
  wishList: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  phoneNumber: String,
  cart: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.methods.removeFromCart = function (this: IUser, productId: string) {
  const updatedCartItems = this.cart.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart = updatedCartItems;
  return this.save();
};

userSchema.methods.populateCart = async function(this: IUser) {
  const populated = await this.populate('cart.productId');
  (populated as any).execPopulate();
};



export const User = mongoose.model<IUser>('User', userSchema);
