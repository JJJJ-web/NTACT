import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import loginInfo from '../config/loginInfo.json';
import socket from '../SocketInfo';

function Google() {
  const googleLoginBtn = useRef(null);
  const history = useHistory();

  useEffect(() => {
    googleSDK();
  }, []);

  // SDK 초기 설정 및 내 API초기화
  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id:
            '126813901957-hvo7qgtpljnpn7rm7i2j0c8o0f6d00lg.apps.googleusercontent.com',
          scope: 'profile email',
        });

        // 버튼 클릭시 사용자 정보 불러오기
        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            axios
              .post('/api/users/google', { headers: { Authorization: googleUser.getAuthResponse().access_token } })
              .then((res) => {
                const user = jwt.verify(
                  res.data.jwtToken,
                  loginInfo.jwt_password,
                ); // 백에서 jwtToken받아옴
                sessionStorage.setItem(
                  'userInfo',
                  JSON.stringify({ userName: user.username, userID: user.id, userRole: user.role }),
                );
                socket.emit('A', { userID: user.id, socketID: socket.id, role: user.role });
                history.push('/menu');
                if (res.status === 200) {
                  // 가입된 사용자일 경우 로그인 성공 처리
                  window.alert('가입된 사용자');
                }
              })
              .catch((error) => alert('Error가 발생하였습니다', error));
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          },
        );
      });
    };
    // 구글 SDK 불러오기
    (function (d, s, id) { 
      let js = '';
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  };

  return (
    <GoogleLoginStyle ref={googleLoginBtn}>
      <img className="icon-img" src="./google-logo.png" alt="googlelogo" />
      구글로 시작하기
    </GoogleLoginStyle>
  );
}

const GoogleLoginStyle = styled.button`
  width: 300px;
  height: 44px;
  border-radius: 5px;
  border-style: none;
  margin: auto;
  margin-bottom: 8px;
  font-size: 12px;
  color: #4a4a4a;
  background-color: #ffffff;
  box-shadow: 0 2px 1px 0 rgba(155, 155, 155, 0.5);
  display: flex;
  align-items: center;

  .icon-img {
    margin-left: 50px;
    margin-right: 26px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;
export default withRouter(Google);
