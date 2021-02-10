import React, {Component, useEffect, useState} from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Kakao from 'kakaojs';
import jwt from 'jsonwebtoken';

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
                            const user = jwt.verify(res.data.jwtToken, // 백에서 jwtToken받아옴
                                'qlalfqjsgh');
                            console.log('username=', user.username, ' id=',
                                user.id, ' iat=', user.iat);
                            setUserName(userName = user.username);
                            props.history.push('/coffee');
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
        <div>
            <button onClick={loginWithKakao}>카카오 로그인</button>
        </div>
    );
}

export default withRouter(Login);