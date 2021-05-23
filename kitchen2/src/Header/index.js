import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Layout, Popover, Button, Divider, notification, Avatar,
} from 'antd';
import {
  LogoutOutlined, UserOutlined, BellTwoTone, ClockCircleTwoTone, FolderAddTwoTone,
} from '@ant-design/icons';
import socket from '../SocketInfo';

const { Header } = Layout;

function Tabs() {
  const history = useHistory();
  const [userName, setUserName] = useState('');

  const openNotificationWithIcon = (info) => {
    notification.open({
      key: 'updatable',
      message: '알림',
      description:
        '새 주문이 접수되었습니다.',
      icon: <BellTwoTone style={{ color: '#ffb400' }} />,
    }, 1000);
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
      openNotificationWithIcon('info');
    });
  }, []);

  function logOut() {
    sessionStorage.removeItem('userInfo');
    history.push('/');
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
        <Button type="link" icon={<BellTwoTone />} onClick={() => history.push('/kitchen')}>
          주문 관리
        </Button>
        <Button type="link" icon={<ClockCircleTwoTone />} onClick={() => history.push('/situation')}>
          실시간 메뉴상황 관리
        </Button>
        <Button type="link" icon={<FolderAddTwoTone />} onClick={() => history.push('/admin')}>
          관리자 메뉴 관리
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
    </Header>
  );
}

export default Tabs;