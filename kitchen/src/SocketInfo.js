import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default socket;