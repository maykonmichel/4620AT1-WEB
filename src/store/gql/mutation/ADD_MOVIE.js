import gql from 'graphql-tag';

export default gql`
  mutation($input: AddMovieInput!) {
    addMovie(input: $input) {
      id
    }
  }
`;
