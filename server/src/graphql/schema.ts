import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: Category!
    quantity: Int!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    products: [Product!]!
    categories: [Category!]!
  }

  # Add mutations as needed
`;
