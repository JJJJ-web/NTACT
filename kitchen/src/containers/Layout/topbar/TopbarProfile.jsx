import React, { useEffect, useState } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import TopbarMenuLink from './TopbarMenuLink';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = () => {
  const history = useHistory();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName, setUserName] = useState('');

  useState(() => {
    if (sessionStorage.getItem('userInfo') === null) {
      history.push('/log_in');
    }else {
      setUserName(JSON.parse(sessionStorage.getItem('userInfo')).userName);
    }
  });

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  function logOut() {
    sessionStorage.removeItem('userInfo');
    history.push('/log_in');
  }

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={handleToggleCollapse}>
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <p className="topbar__avatar-name">{userName}</p>
        <DownIcon className="topbar__icon" />
      </button>
      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <span className="topbar__link-icon lnr lnr-exit" />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <p
            className="topbar__link-title"
            onClick={logOut}
            onKeyPress={logOut}
          >로그아웃
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;