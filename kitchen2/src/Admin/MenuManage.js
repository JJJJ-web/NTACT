import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
  Switch,
  Collapse,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Table, message,
} from 'antd';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AddMenu from './AddMenu';
import MenuTable from './MenuTable';
import CategoryTable from './CategoryTable';

const { Option } = Select;
const { confirm } = Modal;
const { Panel } = Collapse;

function MenuManage() {
  useEffect(() => {
    if(sessionStorage.getItem('userInfo') !== null && JSON.parse(sessionStorage.getItem('userInfo')).userRole !== 'admin') {
      window.location.replace('/kitchen');
    }
  }, []);

  return (
    <TableStyle>
      <AddMenu />
      <Collapse className="collapse" defaultActiveKey={['2']} bordered={false}>
        <Panel header="카테고리 관리" key="1">
          <CategoryTable />
        </Panel>
        <Panel header="메뉴 관리" key="2">
          <MenuTable />
        </Panel>
      </Collapse>
      <br />
    </TableStyle>
  );
}

const TableStyle = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  .collapse {
    background: white;
    .ant-collapse-header {
      font-weight: bold;
      font-size: 1rem;
      color: #ffb301;
    }
  }
`;

export default MenuManage;