import gql from 'graphql-tag';

export default gql`
  query {
    rents {
      id
      data_aluguel
      data_devolucao
      customer {
        id
        name
      }
      employee {
        id
        name
      }
      media {
        id
        location
        movie {
          name
        }
      }
    }
  }
`;
