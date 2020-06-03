import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';

import Header from './components/Header';
import Home from './pages/Home';
import useApi from './store/useApi';

export default () => {
  const api = useApi();

  return (
    api && (
      <ApolloProvider client={api}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    )
  );
};
