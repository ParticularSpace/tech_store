import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import dotenv from 'dotenv';
import { Product } from '../../models/Product';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env variable');
}


export const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      return await User.findById(id);
    },
    getUsers: async () => {
      return await User.find();
    },
    // Add this new query to get the current user
    currentUser: async (_: any, __: any, context: any) => {
      const token = context.req.headers.authorization.split(' ')[1];  // Remove "Bearer "
    
      if (!token) return null;
    
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
    
      if (!user) {
        throw new Error("User not found");
      }
    
      return {
        id: user._id,
        roles: user.roles,
      };
    },
    getUserCart: async (_: any, __: any, context: { userId: string }) => {
      const userId = context.userId;
      const user = await User.findById(userId);
      
      if (!user) throw new Error('User not found');
    
      const cartItems = await Promise.all(user.cart.map(async (item: any) => {
        const product = await Product.findById(item.productId);

        if (!product) throw new Error('Product not found');
    
        return {
          productId: item.productId,
          name: product.name,
          price: product.price,
          imgUrl: product.imgUrl,
          quantity: item.quantity
        };
      }));
      
      return {
        id: user._id,
        items: cartItems
      };
    },
     
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(input.password, saltRounds);

      input.password = hashedPassword;

      
      return await User.create(input);
    },
    signIn: async (_: any, { input }: { input: { email: string, password: string } }) => {
      // Find user by email
      const user = await User.findOne({ email: input.email });
      if (!user) {
        throw new Error('User not found');
      }
    
      // Compare passwords
      const validPassword = await bcrypt.compare(input.password, user.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }
    
      // Generate and return JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user }; // Include user in the response
    },
    updateUserRole: async (_: any, { id, roles }: { id: string, roles: string[] }) => {
      console.log(`Updating roles for user ID: ${id} with roles: ${roles}`);
      const updatedUser = await User.findByIdAndUpdate(id, { roles }, { new: true });
      console.log("Updated User:", updatedUser);
      return updatedUser;
    },
    addProductToCart: async (_: any, { productId, quantity }: { productId: string, quantity: number }, context: { userId: string }) => {

      const userId = context.userId;
     
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      
      // Check if the product is already in the cart
      const existingCartItem = user.cart.find(item => item.productId === productId);
      
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
      
      await user.save();
      return user;
    },
    removeItemFromCart: async (_: any, args: { productId: string }, context: { userId: string }) => {
      console.log("Removing item from cart");
      const userId = context.userId;
      const { productId } = args;
    
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
    
      // Assume removeFromCart is an atomic method or refactor it to be atomic
      await user.removeFromCart(productId);
    
      // Atomic update and save
      await User.updateOne({ _id: userId }, { $pull: { cart: { productId: productId } } });
    
      const updatedUser = await User.findById(userId).populate('cart');
      const updatedCart = updatedUser ? await updatedUser.populateCart() : [];
    
      return {
        id: userId,
        items: updatedCart
      };
    },
  },
};
