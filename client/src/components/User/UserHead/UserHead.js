import React from 'react';
import './UserHead.scss'

const UserHead = ({
  image = "/static/images/default_thumbnail.png",
  username = "username",
  thoughtCount = 150
}) => {
  return (
    <div className='user-head'>
      <div style={{backgroundImage: `url(${image})`}} className='thumbnail'/>
      <div className='username'>{username}</div>
      <div className='count'>흐른 생각 <b>{thoughtCount}개</b></div>
    </div>
  );
};

export default UserHead;