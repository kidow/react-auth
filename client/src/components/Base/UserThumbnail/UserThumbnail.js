import React from 'react';
import Avatar from 'react-avatar'
import './UserThumbnail.scss'

const UserThumbnail = ({thumbnail, onClick, name}) => {
  return (
    <Avatar
      src={`${thumbnail}`}
      className='user-thumbnail' 
      onClick={onClick}
      name={name}
      size='40'
      round
      textSizeRatio={name[0] === ('i' || 'I') ? 0 : 3}
    />
  );
};

export default UserThumbnail;