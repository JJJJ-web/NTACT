import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Layout,
} from 'antd';
import Situation from '../Shop/SituationManage';
import Header from '../Header/index';

const { Content, Footer } = Layout;

function SituationManage() {
  return(
    <Layout style={{ backgroundColor: 'white' }}>
      <Header />
      <Content className="site-layout" style={{ padding: '0 30px', marginTop: 80, backgroundColor: 'white' }}>
        <Situation />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>한성대학교 2021년 캡스톤디자인</Footer>

    </Layout>
  );
}

export default SituationManage;