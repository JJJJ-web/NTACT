import React, {useState} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import io from 'socket.io-client';

// const socket = io('http://localhost:4000');
function Home() {
    const btnSize = 'large';
    const btnShape = 'round';
    return (
        <Layout>
            <div className="header">
                <img height='100%' src='./ntact512.png'/>
            </div>
            <span className="content">
                <Button href='/login' type="primary" shape={btnShape} size={btnSize}>회원</Button>
                <Button href='/menu' type="ghost" shape={btnShape} size={btnSize}>비회원</Button>
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