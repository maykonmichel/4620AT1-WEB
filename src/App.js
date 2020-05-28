import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);
