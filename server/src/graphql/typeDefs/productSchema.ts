import { gql } from 'apollo-server-express';

export const productTypeDefs = gql`
  type Dimensions {
    length: Float
    width: Float
    height: Float
  }

  type Rating {
    user: User!
    rating: Float!
    comment: String
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: Category!
    quantity: Int!
    images: [String!]
    sku: String
    manufacturer: String
    weight: Float
    dimensions: Dimensions
    ratings: [Rating!]
    isFeatured: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input ProductInput {
    name: String!
    price: Float!
    category: ID!

  }

  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product!]

  }

  type Mutation {
    createProduct(input: ProductInput!): Product

  }
`;
 