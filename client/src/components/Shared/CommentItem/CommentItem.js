import React from 'react';
import './CommentItem.scss'
import { Link } from 'react-router-dom'

const CommentItem = ({username, text}) => {
  console.log('username :', username)
  console.log('text :', text)
  return (
    <div className='comment-item'>
      <Link to={`/@${username}`} className='user'>{username}</Link>
      <span className='text'>{text}</span>
    </div>
  );
};

export default CommentItem;