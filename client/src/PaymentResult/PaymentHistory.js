import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { withRouter, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../pages/Header';

const { Meta } = Card;

function PaymentHistory() {
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  const [histories, setHistories] = useState([]);

  async function getList() {
    axios.post(`/api/payments/${userID}`)
      .then((res) => {
        if (res.status === 200) {
          setHistories(res.data);
        } else if (res.status === 204) {
          return (
            <div />
          );
        }
        return null;
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  function convertOrderType(type, status) {
    if (status === 'canceled') {
      return '취소';
    } if (type === 'dine-in') {
      return '테이블';
    } if (type === 'pick-up') {
      return '포장';
    } 
    return '-';
  }

  function colorOrderType(type, status) {
    if (status === 'canceled') {
      return '#adadad';
    } if (type === 'dine-in') {
      return '#fdb916';
    } if (type === 'pick-up') {
      return '#a2d52a';
    } 
    return '#adadad';
  }

  function formatPrice(price) {
    return `${price}원`;
  }

  return (
    <div style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <Header />
      <div>
        {histories.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            extra={<Link to={`/payment/history/${item.id}`}>주문 상세</Link>}
            style={{ margin: '10px' }}
          >
            <Meta
              avatar={(
                <Avatar
                  shape="square"
                  size={60}
                  style={{
                    color: '#ffffff',
                    backgroundColor: colorOrderType(
                      item.order_type,
                      item.order_stat,
                    ),
                  }}
                >
                  {convertOrderType(item.order_type, item.order_stat)}
                </Avatar>
              )}
              title={formatPrice(item.amount)}
              description={new Date(item.date).toLocaleString()}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default withRouter(PaymentHistory);
