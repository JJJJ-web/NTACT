import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home, FinalCart, Menu, Payment, PaymentResult, PaymentSuccess, MenuManage, Login} from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path='/finalcart' component={FinalCart} />
        <Route path='/menu' component={Menu} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/payment/result" component={PaymentResult} />
        <Route exact path="/payment_success" component={PaymentSuccess} />
        <Route path="/menu_manage" component={MenuManage} />
    </Switch>
);

export default Router;