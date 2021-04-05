import React, {useEffect, useState} from 'react';
import Router from './Routes/Router';
import './App.less';
import 'antd/dist/antd.css';
import io from 'socket.io-client';
import socket from './SocketInfo';

function App() {
    const [socketEvents, setSocketEvents] = useState([]);
    const [condition, setCondition] = useState([]);

    console.log(socket);

    socket.on('connect', () => {
        console.log('connection server');
        if(sessionStorage.getItem('userInfo') != null) {
            socket.emit('A', {userID: JSON.parse(sessionStorage.getItem('userInfo')).userId, socketID: socket.id});
        }
    });

    return (
        <div>
            <Router />
        </div>
    );
};

export default App;