import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        };
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseKakao = this.responseKakao.bind(this);
        this.doSignUp = this.doSignUp.bind(this);
    }

    // Google Login
    responseGoogle(res) {
        this.setState({
            id: res.googleId,
            name: res.profileObj.name,
            provider: 'google',
        });
        this.doSignUp();
    }

    // Kakao Login
    responseKakao(res) {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            provider: 'kakao',
        });
        this.doSignUp();
    }

    // Login Fail
    responseFail(err) {
        console.error(err);
    }

    doSignUp() {
        const {id, name, provider} = this.state;

        window.sessionStorage.setItem('id', id);
        window.sessionStorage.setItem('name', name);
        window.sessionStorage.setItem('provider', provider);

        axios.post('http://localhost:3000/coffee', JSON.stringify(this.state), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
                window.alert('login completed');
            }
        }).catch((err) => console.log(err),
            window.alert('post 실패'),
        );

        /* 백에서 json사용안하면 아래 코드 사용
        axios.post('http://localhost:3000/menu', {
            data: {
                id: id,
                name: name,
                provider: provider,
            },
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
                window.alert('login completed');
            }
        }).catch((err) => console.log(err),
            window.alert('post 실패'),
        );
        */
        this.props.history.push('/coffee');
    }

    render() {
        return (
            <Container>
                <GoogleLogin
                    clientId=
                        '126813901957-hvo7qgtpljnpn7rm7i2j0c8o0f6d00lg.apps.googleusercontent.com'
                    buttonText='Google'
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />
                <KakaoButton
                    jsKey='c921a1d3b75cd0acbf7c854d5ae184d3'
                    buttonText='Kakao'
                    onSuccess={this.responseKakao}
                    onFailure={this.responseFail}
                    getProfile='true'
                />
            </Container>
        );
    }
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const KakaoButton = styled(KakaoLogin)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default withRouter(Login);