import React from 'react';
import {FacebookLogin} from 'react-facebook-login-component';
import KakaoLogin from 'react-kakao-login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
    };
  }

  responseFacebook(response) {
    this.setState((state) => ({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
    }), () => console.log(response));
  };

  render() {
    let fbContent;
    let kakaoContent;

    if (this.state.isLoggedIn) {
      <div onClick={alert('개인정보 수집에 동의 하십니까?(예시)')}>
      </div>;
    } else {
      fbContent = (<FacebookLogin
        socialId="236622028050557"
        language="en_US"
        cookie={true}
        fields="id,name,email"
        responseHandler={this.responseFacebook.bind(this)}
        xfbml={true}
        disabled={false}
        version="v3.3"
        className="facebook-login"
        buttonText="Login With Facebook"/>);

      kakaoContent = (
        <KakaoLogin
          jsKey='c921a1d3b75cd0acbf7c854d5ae184d3'
          onSuccess={(res) => console.log(res)}
          onFailure={(res) => console.log(res)}
          getProfile={true}
          className="kakao_login_btn_block"
          buttonText="카카오 계정으로 로그인"
        />
      );
    }

    return (
      <div>
        {fbContent}<br/>
        {kakaoContent}
      </div>
    );
  }
}

export default Login;