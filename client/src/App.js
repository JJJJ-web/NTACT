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

        socket.emit('hello', 'world');
    });

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser);
        return () => {
            window.removeEventListener('beforeunload', alertUser);
        };
    }, []);
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = 'F5 reload';
    };

    return (
        <div>
            <Router />
        </div>
    );
};

export default App;