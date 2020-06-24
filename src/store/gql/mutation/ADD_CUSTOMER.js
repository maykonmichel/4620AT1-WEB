import gql from 'graphql-tag';

export default gql`
  mutation($input: AddCustomerInput!) {
    addCustomer(input: $input) {
      id
    }
  }
`;
