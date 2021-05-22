import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Layout, Popover, Button, Badge, notification, Avatar,
} from 'antd';
import Kitchen from '../Shop/Shop';
import Header from '../Header/index';

const { Content, Footer } = Layout;

function KitchenManage() {
  return(
    <Layout style={{ backgroundColor: 'white' }}>
      <Header />
      <Content className="site-layout" style={{ padding: '0 30px', marginTop: 80, backgroundColor: 'white' }}>
        <Kitchen />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>한성대학교 2021년 캡스톤디자인</Footer>

    </Layout>
  );
}

export default KitchenManage;