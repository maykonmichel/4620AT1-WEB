import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    movie(id: $id) {
      name
      medias {
        id
        location
        available
      }
    }
  }
`;
