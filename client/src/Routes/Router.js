import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home, FinalCart, Coffee, Shake, Ade, MilkBeverage, Payment, PaymentResult, MenuManage, Login} from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path='/finalcart' component={FinalCart} />
        <Route path='/coffee' component={Coffee} />
        <Route path='/shake' component={Shake} />
        <Route path='/ade' component={Ade} />
        <Route path='/milkbeverage' component={MilkBeverage} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/payment/result" component={PaymentResult} />
        <Route path="/menu_manage" component={MenuManage} />
    </Switch>
);

export default Router;