import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    profileImage: String
    roles: [String!]
    addresses: [Address!]
    wishList: [Product!]
    cart: [Product!]
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]

  }

  type Mutation {
    createUser(input: UserInput!): User
    
  }
`;
