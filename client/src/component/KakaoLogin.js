import React, {Component} from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Kakao from 'kakaojs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Authorization: '',
        };
        this.loginWithKakao = this.loginWithKakao.bind(this);
    }

    loginWithKakao() {
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject(new Error('Kakao 인스턴스가 존재하지 않습니다.'));
                }
                window.Kakao.Auth.login({
                    success: (auth) => {
                        console.log('정상적으로 로그인 되었습니다.', auth);
                        this.props.history.push('/coffee');
                        axios.post('http://localhost:4000/api/users/loginKakao',
                            {
                                headers: {
                                    'Authorization': auth.access_token,
                                },
                                withCredentials: true,
                            }).then((res) => {
                            console.log('res.status: ' + res.status);
                            console.log(res.data.name); // 백에서 사용자정보(이름) 받아옴
                            if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
                                window.alert('가입된 사용자');
                            }
                            console.log('res=', res);
                            console.log('auth=', auth);
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

    componentDidMount() {
        if (window.Kakao.Auth.getAccessToken()) {
            console.log('액세스 토큰이 존재합니다. 세션을 유지합니다.');
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.loginWithKakao}>카카오 로그인</button>
            </div>
        );
    }
}

export default withRouter(Login);