import React from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

const SidebarContent = ({ onClick }) => {
  const handleHideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink title="Log Out" icon="exit" route="/log_in" onClick={handleHideSidebar} />
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory title="Example Pages" icon="diamond">
          <SidebarLink title="Page one" route="/pages/one" onClick={handleHideSidebar} />
          <SidebarLink title="Page two" route="/pages/two" onClick={handleHideSidebar} />
        </SidebarCategory>
      </ul>
    </div>
  );
};

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
