import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

/*eslint-disable */
function PayFailed() {
  const location = useLocation();
  const history = useHistory();
  
  if (location.state == null) {
    return <>잘못된 접근입니다.</>;
  }
  const { colorType, resultType, merchant_uid, error_msg, imp_uid } = location.state;
  
  return (
    <Wrapper>
      <Container colorType={colorType}>
        <p>{`결제에 ${resultType}하였습니다`}</p>
        <ul>
          <li>
            <span>주문번호</span>
            <span>{merchant_uid}</span>
          </li>
          <li>
            <span>에러 메시지</span>
            <span>{error_msg}</span>
          </li>
        </ul>
        <Button size="large" onClick={() => history.push("/menu")}>
          돌아가기
        </Button>
      </Container>
    </Wrapper>
  );
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
export default withRouter(PayFailed);