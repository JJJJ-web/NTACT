import React from 'react';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';
import styled from 'styled-components';

function Login() {
    return (
        <LoginButtons>
            <div className="header">
                <img height='100%' src='./ntact512.png'/>
            </div>
            <KakaoLogin/>
            <GoogleLogin/>
        </LoginButtons>
    );
}

const LoginButtons = styled.div`
  display: table;
  margin: auto;
  
  div{
    text-align: center;
  }
  .header{
    height: 30vw;
    margin-bottom: 3rem;
  }
`;
export default Login;