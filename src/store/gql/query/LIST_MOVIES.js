import gql from 'graphql-tag';

export default gql`
  query {
    movies {
      available
      genre
      id
      name
      price
      rating
    }
  }
`;
