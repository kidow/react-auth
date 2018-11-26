import React from 'react';
import './UserMenuItem.scss'

const UserMenuItem = ({onClick, children}) => {
  return (
    <div className='menu-item' onClick={onClick}>
      {children}
    </div>
  );
};

export default UserMenuItem;