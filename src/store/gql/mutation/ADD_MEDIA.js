import gql from 'graphql-tag';

export default gql`
  mutation($input: AddMediaInput!) {
    addMedia(input: $input) {
      id
      available
    }
  }
`;
