import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import CheckBox from '../../../shared/components/form/CheckBox';

const LogInForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isToggleCheckboxEnabled, setIsToggleCheckboxEnabled] = useState(false);

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleToggleCheckBox = () => {
    setIsToggleCheckboxEnabled(!isToggleCheckboxEnabled);
  };

  return (
    <form className="form">
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="name"
            type="text"
            placeholder="Name"
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
      <Link className="btn btn-primary account__btn account__btn--small" to="/pages/one">Sign In</Link>
      <Link className="btn btn-outline-primary account__btn account__btn--small" to="/log_in">Create Account</Link>
    </form>
  );
};

export default LogInForm;
