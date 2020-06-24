import gql from 'graphql-tag';

export default gql`
  mutation($input: UpdateMovieInput!) {
    updateMovie(input: $input) {
      id
      available
    }
  }
`;
