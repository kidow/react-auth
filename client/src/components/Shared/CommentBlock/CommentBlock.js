import React from 'react';
import './CommentBlock.scss'

const CommentBlock = ({onChange, onKeyPress, value}) => {
  return (
    <div className='comment-block'>
      <div className='input-wrapper'>
        <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      </div>
    </div>
  );
};

export default CommentBlock;