import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from './Login/Login';
import Kitchen from './Pages/KitchenManage';
import Situation from './Pages/SituationManage';
import Admin from './Pages/AdminManage';
import NotFound from './Pages/NotFound';

const Router = () => (
  <Switch>
    <Route exact path="/" component={LogIn} />
    <Route path="/kitchen" component={Kitchen} />
    <Route path="/situation" component={Situation} />
    <Route path="/admin" component={Admin} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;