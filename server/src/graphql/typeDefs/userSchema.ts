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
    email: String!
    firstName: String!
    lastName: String!
    profileImage: String
    roles: [String!]
    addresses: [Address!]
    wishList: [Product!]
    createdAt: String!
    updatedAt: String!
    cart: [CartItem!]
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

  type UserCart {
    id: ID!
    items: [CartItem!]!
  }
  
  type CartItem {
    productId: ID!
    name: String!
    price: Float!
    quantity: Int!
    imgUrl: String!
  }
  
  
  type Query {
    getUser(id: ID!): User
    getUsers: [User!]
    currentUser: User
    getUserCart: UserCart!
  }

  type Mutation {
    createUser(input: UserInput!): User
    signIn(input: SignInInput!): SignInResponse!
    updateUserRole(id: ID!, roles: [String!]!): User
    addProductToCart(productId: String!, quantity: Int!): User
    removeItemFromCart(productId: ID!): UserCart
}
`;
