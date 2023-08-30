import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
    
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_NEW_PRODUCT = gql`
  mutation CreateNewProduct(
    $name: String!
    $description: String!
    $price: Float!
    $discountPercentage: Float
    $discountAmount: Float
    $category: String!
    $quantity: Int!
    $stockStatus: String!
    $sku: String!
    $imgUrl: String!
    $dimensions: DimensionsInput!
    $weight: Float!
    $manufacturer: String!
  ) {
    createNewProduct(
      input: {
        name: $name
        description: $description
        price: $price
        discountPercentage: $discountPercentage
        discountAmount: $discountAmount
        category: $category
        quantity: $quantity
        stockStatus: $stockStatus
        sku: $sku
        imgUrl: $imgUrl
        dimensions: $dimensions
        weight: $weight
        manufacturer: $manufacturer
      }
    ) {
      id
      name
      description
      price
    }
  }
`;