import React from 'react';
import './CommentBlock.scss'
import CommentList from '../CommentList';

const CommentBlock = ({onChange, onKeyPress, value, comments, logged}) => {
  return (
    <div className='comment-block'>
      <div className='input-wrapper'>
        <input 
          value={value} 
          onChange={onChange} 
          onKeyPress={onKeyPress}
          placeholder={logged ? "댓글 입력 후 [Enter]를 눌러 작성하세요." : "로그인이 필요합니다."}
          disabled={!logged}
        />
        <CommentList comments={comments}/>
      </div>
    </div>
  );
};

export default CommentBlock;