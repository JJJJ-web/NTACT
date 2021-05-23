import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal, Button, Form, Switch, Col, Row, Select, message, Table,
} from 'antd';
import socket from '../SocketInfo';

const { Option } = Select;

function SituationManage() {
  const [products, setProducts] = useState([]);

  async function soldoutMenuClickHandler(product) {
    await axios.patch(`/api/menus/status/${product.id}`, {}).then((res) => {
      if (res.status === 200) {
        socket.emit('D');
        message.success(`${product.menu_kor} 의 판매 상태가 변경되었습니다.`);
      } else {
        // window.alert('토글 실패111');
      }
    });
  }

  function getMenuSituation() {
    axios.get('/api/menus?category=true').then((res) => {
      setProducts(res.data);
    });
  }

  useState(() => {
    getMenuSituation();
  });

  async function changeDelay(value, product) {
    await axios
      .patch(`/api/menus/delaytime/${product.id}`, {
        headers: {
          delaytime: value,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          socket.emit('D');
          message.success(`${product.menu_kor} 의 지연시간이 변경되었습니다.`);
        } else {
        // window.alert('토글 실패111');
        }
      });
  }

  const columns = [
    {
      title: '카테고리',
      dataIndex: 'category_kor',
      width: '10%',
    },
    {
      title: '메뉴명(한글)',
      dataIndex: 'menu_kor',
      width: '20%',
    },
    {
      title: '판매 상태',
      dataIndex: 'sales_stat',
      filters: [
        { text: '판매', value: 1 },
        { text: '비판매', value: 0 },
      ],
      onFilter: (value, record) => record.sales_stat === value,
      render: (value, record) => (
        <Switch
          checkedChildren="판매중"
          unCheckedChildren="품절"
          style={{ width: '4.5rem' }}
          onChange={() => soldoutMenuClickHandler(record)}
          /* eslint-disable-next-line eqeqeq */
          defaultChecked={record.sales_stat == 1}
        />
      ),
      width: '10%',
    },
    {
      title: '지연상태',
      dataIndex: 'delay_time',
      render: (value, record) => (
        <Select
          defaultValue={
            record.delay_time === 0
              ? '정상 판매'
              : `${record.delay_time}분 지연`
          }
          style={{ width: 120 }}
          onChange={(e) => changeDelay(e, record)}
        >
          <Option value="0">정상 판매</Option>
          <Option value="10">10분 지연</Option>
          <Option value="20">20분 지연</Option>
          <Option value="30">30분 지연</Option>
          <Option value="40">40분 지연</Option>
        </Select>
      ),
      width: '20%',
    },
  ];

  return (
    <>
      <Table
        bordered
        columns={columns}
        rowKey={(item) => item.id}
        dataSource={products}
      />
    </>
  );
}

export default SituationManage;
