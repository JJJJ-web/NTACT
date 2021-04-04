import React, {useEffect, useState} from 'react';
import Router from './Routes/Router';
import './App.less';
import 'antd/dist/antd.css';
import io from 'socket.io-client';
import socket from './SocketInfo';

function App() {
    const [socketEvents, setSocketEvents] = useState([]);

    console.log(socket);

    socket.on('connect', () => {
        console.log('connection server');

        socket.emit('hello', 'world');
    });

    return (
        <div>
            <Router />
        </div>
    );
};

export default App;