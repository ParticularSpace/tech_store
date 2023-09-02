import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  
    type CartItem {
      productId: String!
      quantity: Int!
    }
    
    type User {
      cartItems: [CartItem!]
    
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    profileImage: String
    roles: [String!]
    addresses: [Address!]
    wishList: [Product!]
    cart: [Product!]
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignInResponse {
    token: String!
    user: User!
  }
  

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]
    currentUser: User
  }

  type Mutation {
    createUser(input: UserInput!): User
    signIn(input: SignInInput!): SignInResponse!
    updateUserRole(id: ID!, roles: [String!]!): User
    addCartItem(productId: String!, quantity: Int!): User
  }
`;
