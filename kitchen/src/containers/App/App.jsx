import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import ScrollToTop from './ScrollToTop';
import socket from '../../SocketInfo';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500);
    });
  }, []);

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
      <ScrollToTop>
        {!isLoaded && (
          <div className={`load${isLoading ? '' : ' loaded'}`}>
            <div className="load__icon-wrap">
              <svg className="load__icon">
                <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
              </svg>
            </div>
          </div>
        )}
        <div>
          <Router />
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;