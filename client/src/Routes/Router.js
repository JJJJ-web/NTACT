import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home, Cart, Payment, Coffee, Shake, Ade, MilkBeverage} from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/payment' component={Payment} />
        <Route path='/coffee' component={Coffee} />
        <Route path='/shake' component={Shake} />
        <Route path='/ade' component={Ade} />
        <Route path='/milkbeverage' component={MilkBeverage} />
    </Switch>
);

export default Router;