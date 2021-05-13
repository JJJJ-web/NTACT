import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './Login/Login';
import Header from './Header/index';

const wrappedRoutes = () => (
  <div>
    <div className="container__wrap">
      <Route path="/kitchen" component={Header} />
    </div>
  </div>
);

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/log_in" component={LogIn} />
      <Route path="/" component={wrappedRoutes} />
    </Switch>
  </main>
);

export default Router;