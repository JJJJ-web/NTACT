import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Modal, Button, Form, Switch, Col, Row, Select, message, Table,
} from 'antd';
import socket from '../SocketInfo';


const { Option } = Select;

function SituationManage() {
  // eslint-disable-next-line prefer-const
  let [products, setProducts] = useState([]);

  function getMenuSituation() {
    axios.get('/api/menus?category=true').then((res) => {
      setProducts(res.data);
    });
  }

  async function soldoutMenuClickHandler(product) {
    // eslint-disable-next-line consistent-return
    await axios.patch(`/api/menus/status/${product.id}`, {}).then((res) => {
      if (res.status === 200) {
        getMenuSituation();
        socket.emit('D');
        message
          .loading('변경 중', 0.5)
          .then(() => message.success(`${product.menu_kor} 의 판매 상태가 변경되었습니다.`, 5));
      }
    });
  }

  useEffect(() => {
    socket.on('E', () => {
      getMenuSituation();
    });
  }, []);

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
          getMenuSituation();
          socket.emit('D'); message
            .loading('변경 중', 0.5)
            .then(() => message.success(`${product.menu_kor} 의 지연시간이 변경되었습니다.`, 5));
        } else {
        // window.alert('토글 실패111');
        }
      });
  }

  const columns = [
    {
      title: '카테고리',
      dataIndex: 'category_kor',
      filters: [
        { text: '커피', value: 1 },
        { text: '음료', value: 2 },
        { text: '에이드', value: 3 },
        { text: '쉐이크', value: 4 },
        { text: '블렌딩 티', value: 5 },
        { text: '플랫치노', value: 6 },
        { text: '빙수', value: 7 },
        { text: '병음료', value: 8 },
      ],
      onFilter: (value, record) => record.category_id === value,
      width: '15%',
      align: 'center',
    },
    {
      title: '메뉴명(한글)',
      dataIndex: 'menu_kor',
      width: '40%',
      align: 'center',
    },
    {
      title: '판매 상태',
      dataIndex: 'sales_stat',
      filters: [
        { text: '품절', value: 0 },
      ],
      onFilter: (value, record) => record.sales_stat === value,
      render: (value, record, index) => (
        <Switch
          checkedChildren="판매중"
          unCheckedChildren="품절"
          style={{ width: '4.5rem' }}
          onChange={() => soldoutMenuClickHandler(record)}
          /* eslint-disable-next-line eqeqeq */
          checked={(products[index].sales_stat && record.sales_stat)}
        />
      ),
      width: '10%',
      align: 'center',
    },
    {
      title: '지연상태',
      dataIndex: 'delay_time',
      render: (value, record, index) => (
        <Select
          value={
            products[index].delay_time === 0
              ? '정상 판매'
              : `${products[index].delay_time}분 지연`
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
      width: '15%',
      align: 'center',
    },
  ];

  return (
    <TableStyle>
      <Table
        bordered
        columns={columns}
        rowKey={(item) => item.id}
        dataSource={products}
      />
    </TableStyle>
  );
}

const TableStyle = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export default SituationManage;
