import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import KakaoLogin from '../component/KakaoLogin';
import GoogleLogin from '../component/GoogleLogin';
import NonMemberLogin from '../component/NonMemberLogin';

function Home() {
  const history = useHistory();

  return (
    <Layout>
      <div className="header">
        <img height="30px" src="/logo40.png" alt="logo" />
      </div>
      <b className="store-name">
        이디야커피 한성대점
      </b>
      <div className="store-info-tel">
        02-747-9667
      </div>
      <div className="store-info-address">
        서울 성북구 삼선교로10길 45
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