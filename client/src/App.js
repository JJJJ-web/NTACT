import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Router from './Routes/Router';
import './App.less';
import 'antd/dist/antd.css';
import socket from './SocketInfo';
import loginInfo from './config/loginInfo.json';

function App() {
  const location = useLocation();
  const history = useHistory();

  if(location.pathname !== '/') {
    if (sessionStorage.getItem('jwt') != undefined) {
      try {
        jwt.verify(
          sessionStorage.getItem('jwt'),
          loginInfo.jwt_password,
        );
      } catch (e) {
        if (e.name === 'TokenExpiredError') {
          console.log('토큰시간 만료');
          sessionStorage.removeItem('jwt');
          history.push('/');
        }
      }
    } else if (sessionStorage.getItem('jwt') == undefined) {
      history.push('/');
    }
  }

  socket.on('connect', () => {
    console.log('connection server');
    if (sessionStorage.getItem('userInfo') != null) {
      socket.emit('A', {
        userID: JSON.parse(sessionStorage.getItem('userInfo')).userID,
        socketID: socket.id,
        role: JSON.parse(sessionStorage.getItem('userInfo')).userRole,
      });
    }
  });

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
