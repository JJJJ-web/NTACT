import React from 'react';
import io from 'socket.io-client';

const socket = io('http://13.209.109.91:4000');

export default socket;