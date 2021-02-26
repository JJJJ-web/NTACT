import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

function Home() {
    return (
        <Layout>
            <div className="header">
                <img height='100%' src='./ntact512.png'/>
            </div>
            <span className="content">
                <Button href='/login' type="ghost">회원</Button>
                <Button href='/coffee' type="ghost">비회원</Button>
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
  background-color: white;
  
  .header{
    height: 30vw;
  }
  .content{
    margin-top: 3rem;
    width: 100vw;
  }
  .ant-btn-ghost {
    color: #ffb400;
    width: 30%;
    margin: 10px;
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