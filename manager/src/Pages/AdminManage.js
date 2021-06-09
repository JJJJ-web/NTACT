import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Layout, Popover, Button, Badge, notification, Avatar,
} from 'antd';
import Header from '../Header/index';
import Admin from '../Admin/MenuManage';

const { Content, Footer } = Layout;

function AdminManage() {
  return(
    <Layout style={{ backgroundColor: 'white' }}>
      <Header />
      <Content className="site-layout" style={{ padding: '0 30px', marginTop: 80, backgroundColor: 'white' }}>
        <Admin />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'white', padding: '0px' }}>한성대학교 2021년 캡스톤디자인</Footer>

    </Layout>
  );
}

export default AdminManage;