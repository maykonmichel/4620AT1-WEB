import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    removeEmployee(id: $id) {
      id
    }
  }
`;
