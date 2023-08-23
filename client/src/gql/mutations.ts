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
