import { BrowserRouter } from 'react-router-dom';
import './App.less';
import 'antd/dist/antd.css';
import socket from './SocketInfo';
import Router from './Router';

function App() {
  socket.on('connect', () => {
    console.log('connection server');
    console.log(sessionStorage.getItem('userInfo'));
    if (sessionStorage.getItem('userInfo') != null) {
      socket.emit('A', {
        userID: JSON.parse(sessionStorage.getItem('userInfo')).userID,
        socketID: socket.id,
        role: JSON.parse(sessionStorage.getItem('userInfo')).userRole,
      });
    }
  });

  return (
    <BrowserRouter>
      <div>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
