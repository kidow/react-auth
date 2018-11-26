import React from 'react';
import './UserMenu.scss'

const UserMenu = ({children}) => {
  return (
    <div className='user-menu'>
      <div className='menu-wrapper'>
        {children}
      </div>
    </div>
  );
};

export default UserMenu;