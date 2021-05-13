import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Layout, Popover, Button, Badge, notification,
} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Kitchen from '../Shop/Shop';
import socket from '../SocketInfo';

const { Header, Content, Footer } = Layout;

function Tabs() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  // eslint-disable-next-line prefer-const
  let [count, setCount] = useState(0);

  const openNotificationWithIcon = (info) => {
    notification[info]({
      message: '알림',
      description:
        '새 주문이 접수되었습니다.',
    });
  };

  useState(() => {
    socket.on('G', () => {
      setCount(count += 1);
      openNotificationWithIcon('info');
      // eslint-disable-next-line no-use-before-define
      setNoti(content());
    });
    if (sessionStorage.getItem('userInfo') === null) {
      history.push('/log_in');
    }else {
      setUserName(JSON.parse(sessionStorage.getItem('userInfo')).userName);
    }
  });

  function logOut() {
    sessionStorage.removeItem('userInfo');
    history.push('/log_in');
  }

  const logout = (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={() => logOut()} onKeyDown={() => logOut()}>
      <LogoutOutlined
        onClick={() => logOut()}
        alt="로그아웃"
      />
      {'　'}
      로그아웃
    </div>
  );

  function content() {
    for (let i = 0; i < count; i++) {
      return (
        <div>
          새 주문이 접수되었습니다.
        </div>
      );
    }
    return null;
  }

  const [noti, setNoti] = useState(content());

  return(
    <Layout style={{ backgroundColor: 'white' }}>
      <Header style={{
        position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#FFF8EA',
      }}
      >
        <img height="30px" src="/logo40.png" alt="logo" />

        <b style={{ float: 'right' }}>
          <Badge count={count} dot text=" ">
            {/* eslint-disable-next-line no-return-assign */}
            <Popover content={noti} title={logout} trigger="click" onClick={() => setCount(count = 0)}>
              {userName}
            </Popover>
          </Badge>
        </b>
      </Header>
      <Content className="site-layout" style={{ padding: '0 30px', marginTop: 80, backgroundColor: 'white' }}>
        <Kitchen />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>한성대학교 2021년 캡스톤디자인</Footer>
    </Layout>
  );
}

export default Tabs;