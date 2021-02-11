import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Home, FinalCart, Coffee, Shake, Ade, MilkBeverage, Payment, PaymentResult} from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/finalcart' component={FinalCart} />
        <Route path='/coffee' component={Coffee} />
        <Route path='/shake' component={Shake} />
        <Route path='/ade' component={Ade} />
        <Route path='/milkbeverage' component={MilkBeverage} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/payment/result" component={PaymentResult} />
    </Switch>
);

export default Router;