import React, { useState } from 'react';
import { 
  Card, Button, Select, List, Popconfirm, message,
} from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import SituationManage from './SituationManage';
import socket from '../SocketInfo';

function ShopList(props) {
  const { Option } = Select;
  const [data, setData] = useState([]);
  // eslint-disable-next-line react/destructuring-assignment
  const [status, setStatus] = useState(props.status);
  const [value, setValue] = useState(10);
  const text = '해당 주문을 취소하겠습니까?';

  async function getList() {
    axios
      .get(`/api/orders/${status}`)
      .then((res) => setData(res.data.reverse()));
  }
  
  useState(() => {
    // 역순 출력
    socket.on('G', () => {
      alert('실시간 주문 접수 이벤트 G 수신');
      getList();
    });
    getList();
  }, []);
  
  // eslint-disable-next-line consistent-return
  function changeStatus(item) {
    // 주문 진행 상태 변경
    if (item.order_stat === 'ready') {
      return 'in-progress';
    } if (item.order_stat === 'in-progress') {
      return 'completed';
    }
  }
  function changeTabCountReady() {
    axios.get('/api/orders/ready').then((res) => {
      props.setRCount(res.data.length);
    });
  }
  function changeTabCountProgress() {
    let length;
    axios.get('/api/orders/in-progress').then((res) => {
      props.setPCount(res.data.length);
    });
  }
  function changeTabCountCompleted() {
    axios.get('/api/orders/completed').then((res) => {
      props.setCCount(res.data.length);
    });
  }


  async function changeStateHandler(item) {
    // <> server 주문 진행 상태 변경
    await axios
      .patch(`/api/orders/${item.id}`, {
        headers: {
          status: changeStatus(item),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          socket.emit('B', { userID: item.buyer_id });
          getList();
          changeTabCountReady();
          changeTabCountProgress();
          changeTabCountCompleted();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function cancelPay(item) {
    // 주문 취소 <> server
    await axios({
      url: '/api/payments/cancel',
      method: 'POST',
      headers: {},
      data: {
        merchant_uid: item.id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          message.success('주문이 취소되었습니다.');
          axios
            .patch(`/api/orders/${item.id}`, {
              // 주문 취소: server에 주문 상태 변경
              headers: {
                status: 'canceled',
              },
            })
            .then((res) => {
              if (res.status === 200) {
                getList();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (res.status === 400) {
          console.log(res);
          message.success('유효하지 않은 요청입니다.');
        } else {
          console.log(res);
          alert('환불 실패');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('환불 실패');
      });
  }

  function canceledMenu(item) {
    // 주문 취소 및 환불
    if (item.order_stat === 'ready') {
      cancelPay(item);
    } else {
      message.warning('조리 중에는 주문을 취소할 수 없습니다.');
    }
  }

  // eslint-disable-next-line consistent-return
  function formatDate(date) {
    if (date !== undefined) {
      const time = new Date(date);
      let h = time.getHours();
      const ampm = h >= 12 ? '오후 ' : '오전 ';
      h = h >= 12 ? (h -= 12) : h;
      let m = time.getMinutes();
      m = m >= 10 ? m : `0${m}`;
      const s = time.getSeconds();
      return `${ampm + h}시 ${m}분`;
    }
  }

  function convertOrderType(type) {
    if (type === 'dine-in') {
      return '테이블';
    } if (type === 'pick-up') {
      return '포장';
    } 
    return '-';
  }

  function colorOrderType(type) {
    if (type === 'dine-in') {
      return '#fda200';
    } if (type === 'pick-up') {
      return '#87bd00';
    } 
    return '#8b8b8b';
  }
  function checkOrderStat(stat) {
    if (stat === 'ready' || stat === 'in-progress') {
      return false;
    } 
    return true;
  }
  function returnStat(stat) {
    if (stat === 'ready') {
      return '조리 시작';
    } if (stat === 'in-progress') {
      return '조리 완료';
    } 
    return '완료';
  }
  function chectStatReady(stat) {
    if (stat === 'ready') {
      return 'visible';
    } 
    return 'hidden';
  }
  return (
    <>
      <DivList>
        {data.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="cardList" key={index}>
            <Card
              title={item.id}
              style={{ width: 300 }}
              className="items"
              bodyStyle={{ height: 500 }}
              headStyle={{ fontSize: 20 }}
            >
              <div>
                <b
                  className="order_type"
                  style={{ color: colorOrderType(item.order_type) }}
                >
                  {convertOrderType(item.order_type)}
                </b>
                <span className="date">{formatDate(item.date)}</span>
                <div>
                  <Popconfirm
                    onConfirm={() => canceledMenu(item)}
                    title={text}
                    okText="확인"
                    cancelText="닫기"
                    className="reject"
                  >
                    <Button
                      style={{ visibility: chectStatReady(item.order_stat) }}
                      danger
                      type="primary"
                    >
                      주문 취소
                    </Button>
                  </Popconfirm>
                </div>
                <hr />
                <List itemLayout="vertical">
                  {item.order_detail.map((order, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <List.Item key={index}>
                      <span className="menu">{order.Name}</span>
                      <b className="quantity">{order.Quantity}</b>
                    </List.Item>
                  ))}
                </List>
                <div className="select">
                  <Select
                    defaultValue={10}
                    onChange={(e) => setValue(e)}
                    style={{
                      width: 105,
                      visibility: chectStatReady(item.order_stat),
                    }}
                  >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={15}>15</Option>
                    <Option value={20}>20</Option>
                  </Select>
                  <Button
                    type="primary"
                    disabled={checkOrderStat(item.order_stat)}
                    className="Button"
                    onClick={() => changeStateHandler(item)}
                  >
                    {returnStat(item.order_stat)}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </DivList>
      <SituationManage />
    </>
  );
}

const DivList = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  height: 600px;

  .order_type {
    font-size: 2rem;
  }

  .reject {
    left: 50%;
  }

  .date {
    position: relative;
    left: 10px;
    color: #0062ff;
    font-size: 1rem;
  }

  .menu {
    font-size: 1.1rem;
  }

  .quantity {
    position: absolute;
    right: 10px;
    font-size: 1.3rem;
  }
  .select {
    position: absolute;
    bottom: 30px;
  }
  Button {
    margin-left: 25px;
  }
`;

export default ShopList;
