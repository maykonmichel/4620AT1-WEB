import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    removeMedia(id: $id) {
      id
    }
  }
`;
