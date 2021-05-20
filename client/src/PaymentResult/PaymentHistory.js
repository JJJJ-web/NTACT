import React, { useEffect, useState } from 'react';
import {
  Card, Avatar, Radio,
} from 'antd';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../pages/Header';

const { Meta } = Card;

function PaymentHistory({ location }) {
  const [histories, setHistories] = useState([]);
  const [moreButton, setMoreButton] = useState(1);
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  let more;
  if(location.state !== undefined) {
    more = location.state.more;
  }

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

  async function getMoreList() {
    axios.post(`/api/payments/${userID}?request=all`)
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

  function checkListButton() {
    if (moreButton === 2) { // true면
      getList(); // 이내
      setMoreButton(1);
    } else if(moreButton === 1) { // 기본 false면,
      getMoreList(); // 이전
      setMoreButton(2);
    }
  }

  useEffect(() => {
    if (more === 2) { // 뒤로와서 true면
      setMoreButton(more);
      getMoreList(); // 이전
    } else if(more === 1) { // 뒤로와서 false면
      getList(); // 이내
    } else if(more === undefined && moreButton === 1) { // undefined고, 기본 false면,
      getList(); // 이내
    }
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
    return `${price.toLocaleString()}원`;
  }

  return (
    <div style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <Header />
      <br />
      <RadioStyle>
        <Radio.Group onChange={checkListButton} value={moreButton}>
          <Radio.Button value={1}>30일 이내 결제내역</Radio.Button>
          <Radio.Button value={2}>전체 결제내역</Radio.Button>
        </Radio.Group>
      </RadioStyle>
      <div>
        {histories.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            extra={(
              <Link to={{
                pathname: `/payment/history/${item.id}`,
                state: {
                  more: moreButton,
                },
              }}
              >
                주문 상세
              </Link>
            )}
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

const RadioStyle = styled.div`
  width: 100vw;
  margin: 0 auto;
`;
export default withRouter(PaymentHistory);
