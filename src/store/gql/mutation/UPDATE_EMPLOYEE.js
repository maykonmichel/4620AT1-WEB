import gql from 'graphql-tag';

export default gql`
  mutation($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
    }
  }
`;
