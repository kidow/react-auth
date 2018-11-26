import React from 'react';
import './UserName.scss'

const UserName = ({username}) => {
  return (
    <div className='user-name'>
      @{username}
    </div>
  );
};

export default UserName;