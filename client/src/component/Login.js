import React from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';

function Login() {
  return (
    <LoginButtons>
      <div className="header">
        <img height="100%" src="./ntact512.png" alt="logo" />
      </div>
      <KakaoLogin />
      <GoogleLogin />
    </LoginButtons>
  );
}

const LoginButtons = styled.div`
  display: table;
  margin: auto;

  div {
    text-align: center;
  }
  .header {
    height: 30vw;
    margin-bottom: 3rem;
  }
`;
export default Login;
