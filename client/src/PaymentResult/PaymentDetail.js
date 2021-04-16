import React, { useState } from 'react';
import {
  Card, Layout, Menu, Progress, List, Button, Popover, 
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import ListCard from './ListCard';

function PaymentDetail({ match }, { orderId = [] }) {
  const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  async function getList() {
    await axios.post(`/api/payments/${userId}/${orderId}`).then((res) => {
      setOrderInfo(res.data);
      setOrderDetails(res.data.order_detail);
    });
  }
  useState(() => {
    // eslint-disable-next-line no-param-reassign
    orderId = match.params.orderId;
    getList();
  }, []);

  function reload() {
    getList();
  }

  return (
    <div style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <Layout>
        <Menu
          mode="horizontal"
          theme="light"
          style={{ lineHeight: '30px', backgroundColor: '#FFF8EA' }}
        >
          <Menu.Item key="1">
            <Link to="/payment/history">
              <LeftOutlined />
              뒤로가기
            </Link>
          </Menu.Item>
        </Menu>
      </Layout>
      <ListCard
        orderInfo={orderInfo}
        orderDetails={orderDetails}
        reload={reload}
      />
    </div>
  );
}

export default withRouter(PaymentDetail);
