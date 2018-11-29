import React from 'react';
import './PostFooter.scss'

import { GoHeart } from 'react-icons/go'
import { IoMdChatbubbles } from 'react-icons/io'

const PostFooter = ({liked, likesCount = 0, comments = [], onToggleLike, onCommentClick}) => {
  console.log(comments)
  return (
    <div className='post-footer'>
      <div className='likes'>
        <GoHeart className={liked ? 'active' : 'svg'} onClick={onToggleLike}/>
        <span>좋아요 {likesCount}개</span>
      </div>
      <div className='comments'>
        <IoMdChatbubbles onClick={onCommentClick}/>
        <span>댓글 {comments.length}개</span>
      </div>
    </div>
  );
};

export default PostFooter;