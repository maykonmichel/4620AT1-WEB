import gql from 'graphql-tag';

export default gql`
  query {
    employees {
      id
      pis
      name
      rg
    }
  }
`;
