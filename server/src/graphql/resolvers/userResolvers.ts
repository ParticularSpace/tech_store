import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { User } from '../../models/User';
import dotenv from 'dotenv';
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
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
      return { token, user }; // Include user in the response
    },
    updateUserRole: async (_: any, { id, roles }: { id: string, roles: string[] }) => {
      console.log(`Updating roles for user ID: ${id} with roles: ${roles}`);
      const updatedUser = await User.findByIdAndUpdate(id, { roles }, { new: true });
      console.log("Updated User:", updatedUser);
      return updatedUser;
    },
    addProductToCart: async (_: any, { userId, productId, quantity }: { userId: string, productId: string, quantity: number }) => {
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

  },
};
