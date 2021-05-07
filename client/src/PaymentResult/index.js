import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import PaySuccess from '../Payment/PaySuccess';
import socket from '../SocketInfo';

/*eslint-disable */
function PaymentResult() {
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  const history = useHistory();
  const location = useLocation();
  let query;
  let merchant_uid;
  let error_msg;
  let imp_uid;
  let success;
  let imp_success;

  if (location.state === undefined) { // 모바일
    query = queryString.parse(location.search);
    merchant_uid = query.merchant_uid;
    error_msg = query.error_msg;
    imp_uid = query.imp_uid;
    imp_success = query.imp_success;
  }
  else { // pc버전
    query = location.state.result;
    merchant_uid = query.merchant_uid;
    error_msg = query.error_msg;
    imp_uid = query.imp_uid;
    success = query.success;
  }
  console.log(query);
  const isSuccessed = getIsSuccessed();

  function getIsSuccessed() {
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  const resultType = isSuccessed ? "성공" : "실패";
  const colorType = isSuccessed ? "#52c41a" : "#f5222d";

  function getOrderData() {
    axios
    .post(`/api/payments/${userID}/${merchant_uid}`)
    .then((res) => {
      history.push({
        pathname: '/payment_success',
        state: { orderInfo: res.data },
      });
    })
    .catch((error) => false);
  }

  if (isSuccessed === false) {
    return (
      <Wrapper>
        <Container colorType={colorType}>
          <p>{`결제에 ${resultType}하였습니다`}</p>
          <ul>
            <li>
              <span>주문번호</span>
              <span>{merchant_uid}</span>
            </li>
            {isSuccessed ? (
              <li>
                <span>아임포트 번호</span>
                <span>{imp_uid}</span>
              </li>
            ) : (
              <li>
                <span>에러 메시지</span>
                <span>{error_msg}</span>
              </li>
            )}
          </ul>
          <Button size="large" onClick={() => history.push("/menu")}>
            돌아가기
          </Button>
        </Container>
      </Wrapper>
    );
  }
  if (isSuccessed === true) {
    // socket.emit('F');
    getOrderData();
    return (
      <></>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;

  p {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 3rem;

    li {
      display: flex;
      line-height: 2;

      span:first-child {
        width: 8rem;
        color: #888;
      }

      span:last-child {
        width: calc(100% - 8rem);
        color: #333;
      }
    }
  }

  button,
  button:hover {
    border-color: ${(props) => props.colorType};
    color: ${(props) => props.colorType};
  }

  button:hover {
    opacity: 0.7;
  }
`;

export default withRouter(PaymentResult);
