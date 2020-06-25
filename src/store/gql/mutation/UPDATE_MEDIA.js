import gql from 'graphql-tag';

export default gql`
  mutation($input: UpdateMediaInput!) {
    updateMedia(input: $input) {
      id
      available
    }
  }
`;
