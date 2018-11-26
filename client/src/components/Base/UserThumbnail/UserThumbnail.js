import React from 'react';
import './UserThumbnail.scss'

const UserThumbnail = ({thumbnail, onClick}) => {
  return (
    <div style={{backgroundImage: `url(${thumbnail})`}} className='user-thumbnail' onClick={onClick}>
      
    </div>
  );
};

export default UserThumbnail;