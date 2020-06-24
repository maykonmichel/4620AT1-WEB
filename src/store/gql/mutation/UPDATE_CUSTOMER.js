import gql from 'graphql-tag';

export default gql`
  mutation($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
    }
  }
`;
