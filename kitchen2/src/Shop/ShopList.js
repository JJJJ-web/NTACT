import React, { useState, useEffect } from 'react';
import {
  Card, Button, Select, List, Popconfirm, message,
} from 'antd';
import axios from 'axios';
import styled from 'styled-components';
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
    // eslint-disable-next-line no-return-assign
      .then((res) => {
        if(status === 'in-progress') {
          setData(res.data);
        } else {
          setData(res.data.reverse());
        }
      });
  }

  function changeTabCountReady() {
    axios.get('/api/orders/ready').then((res) => {
      props.setRCount(res.data.length);
    });
  }
  function changeTabCountProgress() {
    axios.get('/api/orders/in-progress').then((res) => {
      props.setPCount(res.data.length);
    });
  }
  function changeTabCountCompleted() {
    axios.get('/api/orders/completed').then((res) => {
      props.setCCount(res.data.length);
    });
  }
  function changeTabCountCanceled() {
    axios.get('api/orders/canceled').then((res) => {
      props.setCanCount(res.data.length);
    });
  }

  useEffect(() => {
    getList();
    socket.on('G', () => {
      getList();
      changeTabCountReady();
    });
    socket.on('I', () => {
      getList();
      changeTabCountReady();
      changeTabCountCanceled();
    });
    socket.on('C', () => {
      getList();
    });
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

  async function changeStateHandler(item) {
    // <> server 주문 진행 상태 변경
    await axios
      .patch(`/api/orders/${item.id}`, {
        headers: {
          status: changeStatus(item),
          userID: JSON.parse(sessionStorage.getItem('userInfo')).userID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          socket.emit('B', { userID: item.buyer_id, status: changeStatus(item) });
          getList();
          changeTabCountReady();
          changeTabCountProgress();
          changeTabCountCompleted();
          changeTabCountCanceled();
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
          socket.emit('J', { userID: item.buyer_id });
          message.success('주문이 취소되었습니다.', 10);
          axios
            .patch(`/api/orders/${item.id}`, {
              // 주문 취소: server에 주문 상태 변경
              headers: {
                status: 'canceled',
                userID: JSON.parse(sessionStorage.getItem('userInfo')).userID,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                getList();
                changeTabCountReady();
                changeTabCountProgress();
                changeTabCountCompleted();
                changeTabCountCanceled();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (res.status === 500) {
          console.log(res);
          message.error('유효하지 않은 요청입니다.', 10);
        } else {
          console.log(res);
          message.error('유효하지 않은 요청입니다.', 10);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error('이미 취소된 주문입니다.', 10);
      });
  }

  function canceledMenu(item) {
    // 주문 취소 및 환불
    if (item.order_stat === 'ready') {
      cancelPay(item);
    } else {
      message.warning('조리 중에는 주문을 취소할 수 없습니다.', 10);
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
      return 'visible';
    }
    return'hidden';
  }
  function returnStat(stat) {
    if (stat === 'ready') {
      return '조리 시작';
    } if (stat === 'in-progress') {
      return '조리 완료';
    } if(stat === 'completed') {
      return '완료';
    }
    return '취소';
  }
  function chectStatReady(stat) {
    if (stat === 'ready') {
      return 'visible';
    }
    return 'hidden';
  }

  function timerHandler() {
  }

  return (
    <>
      <DivList>
        <div className="list">
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
                  <hr />
                  <div className="menus">
                    <List itemLayout="vertical">
                      {item.order_detail.map((order, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <List.Item className="menus_item" key={index}>
                          <div className="menu">{order.Name}</div>
                          <b className="quantity">{order.Quantity}</b>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                  <div className="select">
                    <div className="order">
                      <Button
                        type="primary"
                        style={{ visibility: checkOrderStat(item.order_stat) }}
                        className="statButton"
                        onClick={() => changeStateHandler(item)}
                      >
                        {returnStat(item.order_stat)}
                      </Button>
                    </div>
                    <div className="canceled">
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
                          className="cancelButton"
                        >
                          주문 취소
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </DivList>
    </>
  );
}

const DivList = styled.div`
  .list {
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
    height: 600px;
  }

  .list::-webkit-scrollbar {
    height: 10px;
  }

  .list::-webkit-scrollbar-thumb {
    background-color: #ffb400;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  .list::-webkit-scrollbar-track {
    background-color: white;
  }
  
  .ant-card-head-title {
    overflow: auto;
    text-overflow: initial;
  }
  
  .ant-card-head-title::-webkit-scrollbar {
    display: none;
  }
  
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

  .menus {
    width: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 300px;
    background-image: linear-gradient(to top, white, white),
      linear-gradient(to top, white, white),
      linear-gradient(to top, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
    background-position: bottom center, top center, bottom center, top center;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 20px, 100% 20px, 100% 10px, 100% 10px;
    background-attachment: local, local, scroll, scroll;
  }

  .menus::-webkit-scrollbar {
    width: 7px;
  }

  .menus::-webkit-scrollbar-thumb {
    background-color: white;
    border: 1px solid #ffb400;
    box-shadow: inset 0px 0px 3px #ffb400;
  }

  .menus::-webkit-scrollbar-track {
    background-color: white;
    border: 0.5px solid #bababa;
  }
  
  .menus_item {
    width: 250px;
    height: 50px;
    border-bottom: 1.5px dashed #b9b9b9;
  }

  .menu {
    position: absolute;
    left: 0;
    width: 200px;
    font-size: 1.1rem;
    overFlow: auto;
  }
  
  .menu::-webkit-scrollbar {
    display: none;
  }

  .quantity {
    position: absolute;
    right: 15px;
    font-size: 1.3rem;
  }

  .select {
    position: absolute;
    bottom: 20px;
  }

  .canceled {
    position: absolute;
    right: 5vw;
    bottom: 0px;
  }

  .order {
    position: relative;
    left: 5vw;
  }

  .statButton {
    margin-left: 90px;
  }
  .cancelButton {
    margin-right: 120px;
  }
`;

export default ShopList;
