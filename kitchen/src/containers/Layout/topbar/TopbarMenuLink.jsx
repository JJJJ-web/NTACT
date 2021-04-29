import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

const TopbarMenuLinks = ({ title, icon, path }) => {
  function logOut(path) {
    if(path === '/') {
      sessionStorage.setItem(
        'userInfo',
        { userName: '', userRole: '' },
      );
    }
  }

  // logOut(path);

  return (
    <Link className="topbar__link" to={path}>
      <span className={`topbar__link-icon lnr lnr-${icon}`} />
      <p className="topbar__link-title">{title}</p>
    </Link>
  );
};

TopbarMenuLinks.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default TopbarMenuLinks;