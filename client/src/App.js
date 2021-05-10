import React, { useEffect, useState } from 'react';
import Router from './Routes/Router';
import './App.less';
import 'antd/dist/antd.css';
// import io from 'socket.io-client';
// eslint-disable-next-line import/order
import { useHistory, useLocation } from 'react-router-dom';
import socket from './SocketInfo';
import loginInfo from './config/loginInfo.json';
// eslint-disable-next-line import/order
import jwt from 'jsonwebtoken';

function App() {
  const location = useLocation();
  const [socketEvents, setSocketEvents] = useState([]);
  const [condition, setCondition] = useState([]);
  const history = useHistory();

  console.log(socket);
  console.log(location.pathname);

  if(location.pathname !== '/') { // 첫페이지 빼고
    if (sessionStorage.getItem('jwt') != undefined) { // jwt 있는데
      try { // jwt있는데 만료됐을때
        const user = jwt.verify(
          sessionStorage.getItem('jwt'),
          loginInfo.jwt_password,
        ); // 백에서 jwtToken받아옴
        console.log(user);
      } catch (e) {
        if (e.name === 'TokenExpiredError') {
          console.log('토큰시간 만료');
          sessionStorage.removeItem('jwt');
          history.push('/');
        }
      } finally {
        console.log('finally');
      }
    } else if (sessionStorage.getItem('jwt') == undefined) { // jwt 없을때
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
