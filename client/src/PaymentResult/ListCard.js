import React, { useState } from 'react';
import { Card, List, Progress } from 'antd';
import CancelButton from '../Payment/CancelButton';
import socket from '../SocketInfo';

function ListCard({ orderInfo, orderDetails, reload }) {
  // eslint-disable-next-line prefer-const
  let [stat, setStat] = useState('');

  function convertOrderType(type) {
    if (type === 'dine-in') {
      return '테이블 식사';
    } if (type === 'pick-up') {
      return '포장';
    } 
    return '취식';
  }

  function convertOrderStat(stat) {
    if (stat === 'ready') {
      return '접수 완료';
    } if (stat === 'accept') {
      return '주문 승인';
    } if (stat === 'in-progress') {
      return '조리 중';
    } if (stat === 'completed') {
      return '조리 완료';
    } if (stat === 'canceled') {
      return '주문 취소';
    } if (stat === 'refund') {
      return '환불';
    } 
    return '?';
  }

  function convertOrderStatPercent(stat) {
    if (stat === 'ready') {
      return 20;
    } if (stat === 'accept') {
      return 40;
    } if (stat === 'in-progress') {
      return 70;
    } if (stat === 'completed') {
      return 100;
    } if (stat === 'canceled') {
      return 0;
    } if (stat === 'refund') {
      return 0;
    } 
    return 0;
  }

  function formatOnePrice(price) {
    return `기본: ${price}원`;
  }

  function colorOrderType(type) {
    if (type === 'dine-in') {
      return '#fda200';
    } if (type === 'pick-up') {
      return '#87bd00';
    } 
    return '#8b8b8b';
  }

  useState(() => {
    setStat((stat = orderInfo.order_stat));
    socket.on('C', () => {
      alert('실시간 주문 상태 변경 이벤트 C 수신');
      reload();
    });
  }, []);

  return (
    <Card title={orderInfo.name} bordered={false} style={{ margin: '10px' }}>
      <List itemLayout="horizontal" style={{ margin: '10px' }}>
        <List.Item>
          <Progress
            type="circle"
            percent={convertOrderStatPercent(orderInfo.order_stat)}
            format={() => convertOrderStat(orderInfo.order_stat)}
          />
          <List>
            <b
              style={{
                fontSize: '1.4rem',
                color: colorOrderType(orderInfo.order_type),
              }}
            >
              {convertOrderType(orderInfo.order_type)}
            </b>
            <div style={{ color: '#8b8b8b' }}>
              주문번호:
              {orderInfo.id}
            </div>
            <div style={{ color: '#8b8b8b' }}>
              주문일시: 
              {' '}
              {new Date(orderInfo.date).toLocaleString()}
            </div>
          </List>
          <p />
          <p />
          <p />
        </List.Item>
        {orderDetails.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <List.Item key={index}>
            <List.Item.Meta
              title={item.Name}
              description={formatOnePrice(item.Price)}
            />
            <List.Item.Meta title={item.Quantity} />
            <p>
              {item.Price * item.Quantity}
              원
            </p>
          </List.Item>
        ))}
        <List.Item style={{ fontSize: '1.3rem' }}>
          <p>총 결제금액</p>
          <p>
            {orderInfo.amount}
            원
          </p>
        </List.Item>
      </List>
      <CancelButton orderInfo={orderInfo} reload={reload} />
    </Card>
  );
}

export default ListCard;
