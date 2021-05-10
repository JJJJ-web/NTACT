import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';

function Home() {
  const history = useHistory();

  function guid() {
    function s4() {
      // eslint-disable-next-line no-bitwise
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  function nonMemberLogin() {
    const UUID = guid();
    sessionStorage.setItem(
      'userInfo',
      JSON.stringify({ userName: '비회원', userID: UUID, userRole: 'client' }),
    );
    history.push('/menu');
  }

  return (
    <Layout>
      <div className="header">
        <img height="100%" src="./ntact512.png" alt="logo" />
      </div>
      <span className="content">
        <GoogleLogin />
        <KakaoLogin />
        <NonMemberLoginStyle onClick={nonMemberLogin}>
          <img src="./non-member.png" id="icon-img" alt="비회원로그인" />
          비회원으로 시작하기
        </NonMemberLoginStyle>
      </span>
      <div className="footer">한성대학교 2021년 캡스톤디자인</div>
    </Layout>
  );
}
const NonMemberLoginStyle = styled.button`
  width: 300px;
  height: 44px;
  border-radius: 5px;
  border-style: none;
  margin: auto;
  margin-bottom: 8px;
  font-size: 12px;
  color: #7f7f7f;
  background-color: #ececec;
  box-shadow: 0 2px 1px 0 rgba(155, 155, 155, 0.5);
  display: flex;
  align-items: center;

  #icon-img {
    margin-left: 50px;
    margin-right: 26px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
  .header{
    height: 30vw;
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