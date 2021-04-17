import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button, ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import SettingsIcon from 'mdi-react/SettingsIcon';
import TopbarProfile from './TopbarProfile';

const Topbar = () => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <Link className="topbar__logo" to="/kitchen" />
      </div>
      <div className="topbar__right">
        <Button className="icon" outline color="primary" size="sm" style={{ marginTop: '10px' }}><p><SettingsIcon />메뉴 상황 실시간 관리</p></Button>
        <TopbarProfile />
      </div>
    </div>
  </div>
);

export default Topbar;
