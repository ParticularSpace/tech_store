import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    myQuery: String
  }
`;

export default typeDefs;
