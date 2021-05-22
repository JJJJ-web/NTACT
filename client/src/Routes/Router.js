import React from'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import {
  Home,
  FinalCart,
  Menu,
  Payment,
  PaymentResult,
  PaymentSuccess,
  PaymentFailed,
  PaymentHistory,
  PaymentDetail,
  NotFound,
  MenuManage,
} from './index';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Home} />
    <Route path="/finalcart" component={FinalCart} />
    <Route path="/menu" component={Menu} />
    <Route exact path="/payment" component={Payment} />
    <Route exact path="/payment/result" component={PaymentResult} />
    <Route exact path="/payment_success" component={PaymentSuccess} />
    <Route exact path="/payment_failed" component={PaymentFailed} />
    <Route exact path="/payment/history" component={PaymentHistory} />
    <Route exact path="/payment/history/:orderId" component={PaymentDetail} />
    <Route path="/menu_manage" component={MenuManage} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
