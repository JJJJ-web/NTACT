import React from 'react';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from 'react-kakao-login';

class Login extends React.Component {
    render() {
        const kakaoContent = (
            <KakaoLogin
                jsKey='c921a1d3b75cd0acbf7c854d5ae184d3'
                onSuccess={(res) => console.log(res)}
                onFailure={(res) => console.log(res)}
                getProfile={true}
                className="kakao_login_btn_block"
                buttonText="카카오 계정으로 로그인"/>
        );

        return (
            <div>
                {kakaoContent}
                <GoogleLogin/>
            </div>
        );
    }
}

export default Login;