import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Topbar from './topbar/Topbar';

const Layout = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const layoutClass = classNames({
    layout: true,
    'layout--collapse': true,
  });

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(false);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(false);
  };

  return (
    <div className={layoutClass}>
      <Topbar />
    </div>
  );
};

export default withRouter(Layout);
