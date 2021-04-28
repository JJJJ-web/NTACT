import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';

const LogIn = () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">
            <span className="account__logo">
              <span className="account__logo-accent">NTACT</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">주방관리자 로그인</h4>
        </div>
        <LogInForm />
      </div>
    </div>
  </div>
);

export default LogIn;
