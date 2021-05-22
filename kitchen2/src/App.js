import React, { useEffect, useState } from 'react';
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom';
import Router from './Router';
import './App.less';
import 'antd/dist/antd.css';
import socket from './SocketInfo';

function App() {
  const location = useLocation();
  const history = useHistory();

  if(location.pathname !== '/') {
    console.log(location.pathname);
    if (sessionStorage.getItem('userInfo') == undefined) {
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
