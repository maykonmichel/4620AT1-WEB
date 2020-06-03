import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';

import Header from './components/Header';
import Pages from './pages';
import useApi from './store/useApi';

export default () => {
  const api = useApi();

  return (
    api && (
      <ApolloProvider client={api}>
        <BrowserRouter>
          <Header />
          <Pages />
        </BrowserRouter>
      </ApolloProvider>
    )
  );
};
