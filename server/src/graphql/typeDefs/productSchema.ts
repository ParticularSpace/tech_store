import { gql } from "apollo-server-express";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    discountPercentage: Float
    discountAmount: Float
    category: String!
    quantity: Int!
    stockStatus: String!
    sku: String!
    imgUrl: String!
    dimensions: Dimensions!
    weight: Float!
    manufacturer: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    discountPercentage: Float
    discountAmount: Float
    category: String!
    quantity: Int!
    stockStatus: String!
    sku: String!
    imgUrl: String!
    dimensions: DimensionsInput!
    weight: Float!
    manufacturer: String!
  }

  input DimensionsInput {
    length: Float!
    width: Float!
    height: Float!
  }

  type Dimensions {
    length: Float!
    width: Float!
    height: Float!
  }

  type Query {
    getAllProducts(search: String): [Product]
    getProduct(id: String!): Product
    searchProducts(searchTerm: String!): [Product]
  }

  type Mutation {
    createNewProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product
    removeProduct(id: ID!): Boolean
  }
`;
