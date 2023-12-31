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

export const CREATE_NEW_CATEGORY = gql`
  mutation createNewCategory($name: String!, $description: String) {
    createNewCategory(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: String!, $quantity: Int!) {
    addProductToCart(productId: $productId, quantity: $quantity) {
      id
      cart {
        productId
        quantity
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($productId: ID!) {
    removeItemFromCart(productId: $productId) {
      id
      items {
        productId
        name
        price
        quantity
        imgUrl
      }
    }
  }
`;

