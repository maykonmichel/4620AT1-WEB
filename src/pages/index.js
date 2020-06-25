import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';
import Movies from './Movies';
import Customers from './Customers';
import Medias from './Medias';

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
      <Route path="/medias" exact>
        <Medias />
      </Route>
    </Switch>
  );
};

Pages.propTypes = {};

Pages.defaultProps = {};

export default memo(Pages);
