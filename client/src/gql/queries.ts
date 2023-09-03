import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      roles
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      imgUrl
    }
  }
`;


export const GET_ALL_PRODUCTS = gql`
query GetAllProducts($search: String) {
  getAllProducts(search: $search) {
    id
    name
    description
    price
    imgUrl
  }
}
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchTerm: String!) {
    searchProducts(searchTerm: $searchTerm) {
      id
      name
      description
      price
      imgUrl
    }
  }
`;

export const GET_USER_CART = gql`
  query getUserCart {
    getUserCart {
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




