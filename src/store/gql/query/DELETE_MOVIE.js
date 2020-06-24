import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    removeMovie(id: $id) {
      id
    }
  }
`;
