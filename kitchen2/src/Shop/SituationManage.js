import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal, Button, Form, Switch, Col, Row, Select, message, 
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

  return (
    <div>
      {products.map((product, index) => (
        <Row key={product.id} justify="space-around" gutter={[10, 20]}>
          <Col span={4}>
            <span>{product.category_kor}</span>
          </Col>
          <Col span={10}>
            <span>{product.menu_kor}</span>
          </Col>
          <Col span={4}>
            <Switch
              checkedChildren="판매중"
              unCheckedChildren="품절"
              style={{ width: '4.5rem' }}
              onChange={() => soldoutMenuClickHandler(product)}
              /* eslint-disable-next-line eqeqeq */
              defaultChecked={product.sales_stat == true}
            />
          </Col>
          <Col span={6}>
            <Select
              defaultValue={
                product.delay_time === 0
                  ? '정상 판매'
                  : `${product.delay_time}분 지연`
              }
              style={{ width: 120 }}
              onChange={(e) => changeDelay(e, product)}
            >
              <Option value="0">정상 판매</Option>
              <Option value="10">10분 지연</Option>
              <Option value="20">20분 지연</Option>
              <Option value="30">30분 지연</Option>
              <Option value="40">40분 지연</Option>
            </Select>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default SituationManage;
