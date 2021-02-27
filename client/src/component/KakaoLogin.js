import React, {Component, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Kakao from 'kakaojs';
import jwt from 'jsonwebtoken';
import loginInfo from '../config/loginInfo.json';
import styled from 'styled-components';

function Login(props) {
    let [userName, setUserName] = useState('');
    let [Authorization, setAuthorization] = useState('');

    const loginWithKakao = () => {
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject(new Error('Kakao 인스턴스가 존재하지 않습니다.'));
                }
                if (window.Kakao.Auth.getAccessToken()) {
                    console.log('액세스 토큰이 존재합니다. 세션을 유지합니다.');
                }
                window.Kakao.Auth.login({
                    success: (auth) => {
                        console.log('정상적으로 로그인 되었습니다.', auth);
                        setAuthorization(Authorization = auth.access_token);
                        axios.post('http://localhost:4000/api/users/loginKakao',
                            {
                                headers: {
                                    'Authorization': auth.access_token,
                                },
                                withCredentials: true,
                            }).then((res) => {
                            console.log('res.status: ' + res.status);
                            if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
                                window.alert('가입된 사용자');
                            }
                            const user = jwt.verify(res.data.jwtToken,
                                loginInfo.jwt_password); // 백에서 jwtToken받아옴
                            setUserName(userName = user.username);
                            localStorage.setItem('userInfo', JSON.stringify({userName: user.username, userId: user.id, userIat: user.iat}));
                            props.history.push('/menu');
                        }).catch((err) => {
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
    /*
    logoutWithKakao() {
        if (window.Kakao.Auth.getAccessToken()) {
            console.log('카카오 인증 액세스 토큰이 존재합니다.',
                window.Kakao.Auth.getAccessToken());
            window.Kakao.Auth.logout(() => {
                console.log('로그아웃 되었습니다', window.Kakao.Auth.getAccessToken());
            });
        }
    };
     */

    return (
        <KakaoLoginStyle onClick={loginWithKakao}>
            <img src="./kakao-logo.png" id="icon-img" />카카오로 로그인
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
  
  #icon-img{
    margin-left: 50px;
    margin-right:26px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;

export default withRouter(Login);