import React, { useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, NotificationTwoTone, BellTwoTone } from '@ant-design/icons';
import socket from '../SocketInfo';

function Header() {
  function convertOrderStat(stat) {
    if (stat === 'accept') {
      return '주문 승인';
    } if (stat === 'in-progress') {
      return '조리 시작';
    } if (stat === 'completed') {
      return '조리 완료';
    }
    return '?';
  }

  useEffect(() => {
    socket.on('K', () => {
      if(window.location.pathname === '/payment_success') {
        window.location.replace('/payment_success');
      }
      notification.open({
        key: 'updatable',
        message: '알림',
        description:
          '접수 전 주문이 취소되었습니다.',
        icon: <NotificationTwoTone twoToneColor="#d50d1e" />,
      }, 10000);
    });
    socket.on('C', (stat) => {
      const status = convertOrderStat(stat);
      notification.open({
        key: 'updatable',
        message: '알림',
        description:
          `내 주문표가 ${status} 되었습니다.`,
        icon: <BellTwoTone twoToneColor="#ffb400" />,
      }, 10000);
    });
  });

  return (
    <Layout>
      <Menu
        theme="light"
        inlineIndent="1"
        mode="horizontal"
        style={{
          paddingTop: '10px',
          lineHeight: '30px',
          backgroundColor: '#FFF8EA',
        }}
      >
        <Menu.Item key="1" style={{ float: 'left' }}>
          <Link to="/menu">
            <img height="18px" src="/logo-e30.png" alt="logo" style={{ paddingBottom: '5px' }} />
          </Link>
        </Menu.Item>

        <Menu.Item key="3" style={{ float: 'right' }}>
          <Link to="/payment/history">
            <MenuOutlined />
            결제 내역
          </Link>
        </Menu.Item>
      </Menu>
    </Layout>
  );
}

export default Header;
