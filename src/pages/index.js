import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';
import Movies from './Movies';
import Customers from './Customers';

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/customers" exact>
        <Customers />
      </Route>
      <Route path="/movies" exact>
        <Movies />
      </Route>
    </Switch>
  );
};

Pages.propTypes = {};

Pages.defaultProps = {};

export default memo(Pages);
