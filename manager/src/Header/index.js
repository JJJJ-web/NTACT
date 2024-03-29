import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Layout, Popover, Button, Divider, notification, Avatar, message,
} from 'antd';
import {
  LogoutOutlined, UserOutlined, BellTwoTone, ClockCircleTwoTone,
  FolderAddTwoTone, NotificationTwoTone,
} from '@ant-design/icons';
import socket from '../SocketInfo';

const { Header } = Layout;

function Tabs() {
  const history = useHistory();
  const [userName, setUserName] = useState('');

  const onNewOrder = () => {
    notification.open({
      key: 'updatable',
      message: '알림',
      description:
        '새 주문이 접수되었습니다.',
      icon: <BellTwoTone twoToneColor="#ffb400" />,
    }, 10000);
  };

  const onCancelOrder = () => {
    notification.open({
      key: 'updatable',
      message: '알림',
      description:
        '접수 전 주문이 고객에 의해 취소되었습니다.',
      icon: <NotificationTwoTone twoToneColor="#d50d1e" />,
    }, 10000);
  };

  useState(() => {
    if (sessionStorage.getItem('userInfo') === null) {
      history.push('/');
    }else {
      setUserName(JSON.parse(sessionStorage.getItem('userInfo')).userName);
    }
  });

  useEffect(() => {
    socket.on('G', () => {
      onNewOrder();
    });
    socket.on('I', () => {
      onCancelOrder();
    });
    socket.on('K', () => {
      onCancelOrder();
    });
  }, []);

  function logOut() {
    sessionStorage.removeItem('userInfo');
    history.push('/');
  }

  function checkAdmin() {
    if(JSON.parse(sessionStorage.getItem('userInfo')).userRole === 'admin') {
      history.push('/admin');
    } else {
      message.error('접근 권한이 없습니다. 관리자 계정으로 로그인하세요.', 5);
    }
  }

  const logout = (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={() => logOut()} onKeyDown={() => logOut()} style={{ cursor: 'pointer' }}>
      <LogoutOutlined
        onClick={() => logOut()}
        alt="로그아웃"
      />
      {'　'}
      로그아웃
    </div>
  );

  function content() {
    return (
      <div style={{ width: '180px', marginLeft: '-10px', fontSize: '1.3rem' }}>
        <Button type="link" icon={<BellTwoTone twoToneColor="#ffb400" />} onClick={() => history.push('/kitchen3')}>
          주문 관리
        </Button>
        <Button type="link" icon={<ClockCircleTwoTone twoToneColor="#ffb400" />} onClick={() => history.push('/situation')}>
          실시간 메뉴상황 관리
        </Button>
        <Button
          type="link"
          icon={<FolderAddTwoTone twoToneColor={sessionStorage.getItem('userInfo') !== null && JSON.parse(sessionStorage.getItem('userInfo')).userRole === 'admin' ? '#ffb400' : '#acabab'} />}
          onClick={() => checkAdmin()}
          style={sessionStorage.getItem('userInfo') !== null && JSON.parse(sessionStorage.getItem('userInfo')).userRole === 'admin' ? { color: '#ffb400' } : { color: '#acabab' }}
        >
          메뉴 관리
        </Button>
      </div>
    );
  }

  return(
    <Header style={{
      position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#FFF8EA',
    }}
    >
      <Link to="/kitchen">
        <img height="30px" src="/logo40.png" alt="logo" />
      </Link>

      <b style={{ float: 'right' }}>
        {/* eslint-disable-next-line no-return-assign */}
        <Popover placement="bottomRight" content={content} title={logout} trigger="click">
          <Avatar
            size={35}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#ffb400',
              marginRight: '5px',
            }}
          />
          {userName}
        </Popover>
      </b>

      <b style={{ fontSize: '15px', float: 'right', marginRight: '25px' }}>이디야커피 한성대점</b>
    </Header>
  );
}

export default Tabs;