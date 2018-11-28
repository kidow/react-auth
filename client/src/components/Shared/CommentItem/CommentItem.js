import React from 'react';
import './CommentItem.scss'

const CommentItem = ({username, text}) => {
  return (
    <div className='comment-item'>
      <span className='user'>{username}</span>
      <span className='text'>{text}</span>
    </div>
  );
};

export default CommentItem;