import React, { useState, useEffect } from 'react';
import {
  Card, Layout, Menu, Progress, List, Button, Popover, notification,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { LeftOutlined, NotificationTwoTone } from '@ant-design/icons';
import axios from 'axios';
import ListCard from './ListCard';
import socket from '../SocketInfo';

function PaymentDetail({ match, location }) {
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  const { orderId } = match.params;
  const { more } = location.state;

  function getList() {
    axios.post(`/api/payments/${userID}/${orderId}`).then((res) => {
      setOrderInfo(res.data);
      setOrderDetails(res.data.order_detail);
    });
  }

  useEffect(() => {
    getList();
    socket.on('K', () => {
      getList();
      notification.open({
        key: 'updatable',
        message: '알림',
        description:
          '접수 전 주문이 고객에 의해 취소되었습니다.',
        icon: <NotificationTwoTone twoToneColor="#d50d1e" />,
      }, 1000);
    });
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
            <Link to={{
              pathname: '/payment/history',
              state: {
                more,
              },
            }}
            >
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
