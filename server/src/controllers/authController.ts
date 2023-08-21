import { User } from '../models/User';

export const register = async (username: string, password: string, email: string) => {
  const newUser = new User({ username, password, email });
  await newUser.save();
};

export const login = async (username: string, password: string) => {
  // Implement login logic
};

export const logout = async () => {
  // Implement logout logic
};
