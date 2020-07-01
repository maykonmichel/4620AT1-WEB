import gql from 'graphql-tag';

export default gql`
  mutation($input: AddRentInput!) {
    addRent(input: $input) {
      id
    }
  }
`;
