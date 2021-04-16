import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const layoutClass = classNames({
    layout: true,
    'layout--collapse': isSidebarCollapsed,
  });

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  return (
    <div className={layoutClass}>
      <Topbar
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        changeSidebarVisibility={changeSidebarVisibility}
      />
      <Sidebar
        sidebarShow={isSidebarShown}
        sidebarCollapse={isSidebarCollapsed}
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
      />
    </div>
  );
};

export default withRouter(Layout);
