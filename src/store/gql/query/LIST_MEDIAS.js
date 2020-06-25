import gql from 'graphql-tag';

export default gql`
  query {
    movies {
      id
      name
      medias {
        id
        location
        available
      }
    }
  }
`;
