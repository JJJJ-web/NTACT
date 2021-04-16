import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopbarProfile from './TopbarProfile';

const Topbar = () => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <Link className="topbar__logo" to="/online_marketing_dashboard" />
      </div>
      <div className="topbar__right">
        <TopbarProfile />
      </div>
    </div>
  </div>
);

export default Topbar;
