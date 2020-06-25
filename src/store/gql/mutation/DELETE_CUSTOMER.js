import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    removeCustomer(id: $id) {
      id
    }
  }
`;
