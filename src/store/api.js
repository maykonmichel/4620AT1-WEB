import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

export const cache = new InMemoryCache();

const link = new HttpLink({uri: process.env.REACT_APP_API_URL});

export default new ApolloClient({
  cache,
  link,
});
