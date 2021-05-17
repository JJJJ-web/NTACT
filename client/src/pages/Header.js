import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined, ReadOutlined } from '@ant-design/icons';

function Header() {
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
