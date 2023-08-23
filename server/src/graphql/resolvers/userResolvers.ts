import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    
   
  },
 
};
