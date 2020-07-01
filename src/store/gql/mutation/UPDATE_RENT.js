import gql from 'graphql-tag';

export default gql`
  mutation($input: RefundRentInput!) {
    refundRent(input: $input) {
      id
    }
  }
`;
