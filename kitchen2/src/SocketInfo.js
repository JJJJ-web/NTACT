import React from 'react';
import io from 'socket.io-client';

const socket = io('https://dev.ntact.site');

export default socket;