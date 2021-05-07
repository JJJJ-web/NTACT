import React, { useState } from 'react';
import { Steps } from 'antd';
import { withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../pages/Header';
import ListCard from '../PaymentResult/ListCard';

function PaySuccess() {
  const location = useLocation();
  const { Step } = Steps;
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  console.log('PaySuccess');
  console.log(location.state);
  if (location.state == null) {
    return <>잘못된 접근입니다.</>;
  } 
  const orderID = location.state.orderInfo.id;
  // eslint-disable-next-line prefer-const
  let [orderInfo, setOrderInfo] = useState([]);
  // eslint-disable-next-line prefer-const
  let [orderDetails, setOrderDetails] = useState([]);

  async function getList() {
    await axios.post(`/api/payments/${userID}/${orderID}`).then((res) => {
      setOrderInfo((orderInfo = res.data));
      setOrderDetails((orderDetails = res.data.order_detail));
    });
  }

  function reload() {
    getList();
  }

  useState(() => {
    getList();
  }, []);

  return (
    <>
      <Header />
      <Steps
        type="navigation"
        size="small"
        current={2}
        className="site-navigation-steps"
      >
        <Step title="상품 확인" status="finish" />
        <Step title="결제" status="finish" />
        <Step title="주문 접수" status="process" />
      </Steps>
      <ListCard
        orderInfo={orderInfo}
        orderDetails={orderDetails}
        reload={reload}
      />
    </>
  );
}

export default withRouter(PaySuccess);
