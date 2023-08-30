import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      roles
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts {
      id
      name
      description
      price
      imgUrl
    }
  }
`;




