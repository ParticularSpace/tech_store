// server/src/graphql/resolvers/userResolvers.ts

import { User } from '../../models/User';

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
      return await User.create(input);
    },
    // Add other mutations for updating, deleting users
  },
  // Add field resolvers if needed
};
