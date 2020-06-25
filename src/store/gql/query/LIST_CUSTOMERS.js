import gql from 'graphql-tag';

export default gql`
  query {
    customers {
      id
      rg
      name
      cpf
    }
  }
`;
