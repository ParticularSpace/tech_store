import { gql } from 'apollo-server-express';

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    description: String
    parent: ID
    image: String
    slug: String
    isFeatured: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CategoryInput {
    name: String!
    description: String
    parent: ID
    image: String
    slug: String
    isFeatured: Boolean!

  }

  type Query {
    getCategory(id: ID!): Category
    getCategories: [Category!]
    
  }
  
  type Mutation {
    createNewCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category
    removeCategory(id: ID!): Boolean
  }

`;

