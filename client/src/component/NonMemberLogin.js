import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import loginInfo from '../config/loginInfo.json';
import socket from '../SocketInfo';

function NonMemberLogin(withRouter) {
  const history = useHistory();
  const [userName, setUserName] = useState('');

  const Login = () => {
    axios.post('/api/users/anonymous')
      .then((res) => {
        sessionStorage.setItem(
          'jwt',
          res.data.jwtToken,
        );
        const user = jwt.verify(
          res.data.jwtToken,
          loginInfo.jwt_password,
        ); // 백에서 jwtToken받아옴
        setUserName((user.username));
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({
            userName: user.username,
            userID: user.id,
            userRole: user.role,
          }),
        );
        socket.emit('A', { userID: user.id, socketID: socket.id, role: user.role });
        history.push('/menu');
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <NonMemberLoginStyle onClick={Login}>
      <img src="./non-member.png" id="icon-img" alt="비회원로그인" />
      비회원으로 시작하기
    </NonMemberLoginStyle>
  );
}

const NonMemberLoginStyle = styled.button`
  width: 300px;
  height: 44px;
  border-radius: 5px;
  border-style: none;
  margin: auto;
  margin-bottom: 8px;
  font-size: 12px;
  color: #7f7f7f;
  background-color: #ececec;
  box-shadow: 0 2px 1px 0 rgba(155, 155, 155, 0.5);
  display: flex;
  align-items: center;

  #icon-img {
    margin-left: 50px;
    margin-right: 26px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;

export default withRouter(NonMemberLogin);