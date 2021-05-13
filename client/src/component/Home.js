import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';
import NonMemberLogin from './NonMemberLogin';

function Home() {
  const history = useHistory();

  return (
    <Layout>
      <div className="header">
        <img height="30px" src="./logo40.png" alt="logo" />
      </div>
      <b className="store-name">
        이디야커피랩
      </b>
      <div className="store-info-tel">
        02-543-6467
      </div>
      <div className="store-info-address">
        서울특별시 강남구 논현동 논현로 636
      </div>
      <b className="introduction">
        환영합니다.
        <br />
        NTACT 간편 주문 서비스입니다.
      </b>
      <span className="content">
        <GoogleLogin />
        <KakaoLogin />
        <NonMemberLogin />
      </span>
      <div className="footer">한성대학교 2021년 캡스톤디자인</div>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
  .header{
    margin-top: 10px;
    height: 30px;
  }
  .store-name{
    margin-top: 3rem;
    font-size: 2rem;
  }
  .store-info-tel{
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }
  .store-info-address{
    margin-top: 0.5rem;
  }
  .introduction{
    margin-top: 3rem;
    color: #ffb400;
  }
  .content{
    margin-top: 3rem;
    width: 100vw;
  }
  .ant-btn-primary {
    width: 30%;
    margin: 10px;
    padding-bottom: 3rem;
  }
  .ant-btn-ghost {
    width: 30%;
    margin: 10px;
    padding-bottom: 3rem;
  }
  .footer{
    position:fixed;
    left:0px;
    bottom:0px;
    width: 100%;
    margin-top: 3rem;
  }
`;
export default Home;