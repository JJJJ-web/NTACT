import React from 'react';
import Router from './Routes/Router';
import './App.less';
import 'antd/dist/antd.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
function App() {
    socket.on('connect', () => {
        console.log('connection server');
    });

    return (
        <div>
            <Router />
        </div>
    );
};

export default App;