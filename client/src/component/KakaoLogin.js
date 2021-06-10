import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Kakao from 'kakaojs';
import jwt from 'jsonwebtoken';
import loginInfo from '../config/loginInfo.json';
import socket from '../SocketInfo';

function KakaoLogin(props) {
  const [userName, setUserName] = useState('');
  const [Authorization, setAuthorization] = useState('');

  // eslint-disable-next-line consistent-return
  const loginWithKakao = () => {
    try {
      return new Promise((resolve, reject) => {
        if (!Kakao) {
          reject(new Error('Kakao 인스턴스가 존재하지 않습니다.'));
        }
        window.Kakao.Auth.login({
          success: (auth) => {
            setAuthorization((auth.access_token));
            axios
              .post('/api/users/kakao', {
                headers: {
                  Authorization: auth.access_token,
                },
                withCredentials: true,
              })
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
                    userTel: user.tel,
                  }),
                );
                socket.emit('A', { userID: user.id, socketID: socket.id, role: user.role });
                props.history.push('/menu');
              })
              .catch((err) => {
                console.log(err);
              });
          },
          fail: (err) => {
            console.error(err);
          },
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <KakaoLoginStyle onClick={loginWithKakao}>
      <img src="./kakao-logo.png" id="icon-img" alt="kakaologo" />
      카카오로 시작하기
    </KakaoLoginStyle>
  );
}

const KakaoLoginStyle = styled.button`
  width: 300px;
  height: 44px;
  border-radius: 5px;
  border-style: none;
  margin: auto;
  margin-bottom: 8px;
  font-size: 12px;
  color: #4a4a4a;
  background-color: #fff115;
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

export default withRouter(KakaoLogin);
