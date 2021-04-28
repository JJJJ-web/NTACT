import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import loginInfo from '../loginInfo.json';
import CheckBox from '../../../shared/components/form/CheckBox';

const LogInForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isToggleCheckboxEnabled, setIsToggleCheckboxEnabled] = useState(false);
  const [userID, setuserID] = useState('');
  const [userPW, setuserPW] = useState('');

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleToggleCheckBox = () => {
    setIsToggleCheckboxEnabled(!isToggleCheckboxEnabled);
  };

  function login(e) {
    e.preventDefault();
    axios({
      url: '/api/users/chef',
      method: 'POST',
      data: {
        email: userID,
        password: userPW,
      },
    })
      .then((res) => { // 로그인 성공시
        if (res.status === 200) {
          const user = jwt.verify(
            res.data.jwtToken,
            loginInfo.jwt_password,
          ); // 백에서 jwtToken받아옴
          sessionStorage.setItem(
            'userInfo',
            JSON.stringify({ userName: user.name, userRole: user.role }),
          );
          // eslint-disable-next-line no-restricted-globals
          history.push('/kitchen');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <form
      className="form"
      onSubmit={(e) => {
        login(e);
      }}
    >
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="id"
            type="text"
            placeholder="ID"
            onChange={(e) => setuserID(e.target.value)}
            value={userID}
            required
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <input
            name="password"
            type={isPasswordShown ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => setuserPW(e.target.value)}
            value={userPW}
            required
          />
          <button
            className={`form__form-group-button${isPasswordShown ? ' active' : ''}`}
            onClick={() => handleShowPassword()}
            type="button"
          ><EyeIcon />
          </button>
        </div>
        <div className="account__forgot-password">
          <a href="/">Forgot a password?</a>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field">
          <CheckBox
            name="remember_me"
            label="Remember me"
            value={isToggleCheckboxEnabled}
            onChange={handleToggleCheckBox}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary account__btn account__btn--small" onClick={login} onKeyDown={login}>Sign In</button>
    </form>
  );
};

export default LogInForm;
