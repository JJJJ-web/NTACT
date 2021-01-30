import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home, Menu, Cart, Payment} from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/menu' component={Menu} />
        <Route path='/cart' component={Cart} />
        <Route path='/payment' component={Payment} />
    </Switch>
);

export default Router;