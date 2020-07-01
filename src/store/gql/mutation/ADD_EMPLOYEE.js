import gql from 'graphql-tag';

export default gql`
  mutation($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      id
    }
  }
`;
