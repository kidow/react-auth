import React from 'react';
import './CommentBlock.scss'
import CommentList from '../CommentList';

const CommentBlock = ({onChange, onKeyPress, value, comments}) => {
  return (
    <div className='comment-block'>
      <div className='input-wrapper'>
        <input 
          value={value} 
          onChange={onChange} 
          onKeyPress={onKeyPress}
          placeholder="댓글을 입력 후 [Enter]를 눌러 작성하세요."
        />
        <CommentList comments={comments}/>
      </div>
    </div>
  );
};

export default CommentBlock;