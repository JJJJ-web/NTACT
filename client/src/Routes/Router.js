import React from'react';
import { Switch, Route } from 'react-router-dom';
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
  MenuManage,
  Shop,
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
    <Route path="/shop" component={Shop} />
    <Route render={() => <div>에러</div>} />
  </Switch>
);

export default Router;
