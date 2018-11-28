import React from 'react';
import './PostFooter.scss'

import { GoHeart } from 'react-icons/go'
import { IoMdChatbubbles } from 'react-icons/io'

const PostFooter = ({active, liked, likesCount = 0, comments = [], onToggleLike, onCommentClick}) => {
  
  return (
    <div className='post-footer'>
      <div 
        style={{}}
        className='likes' 
        active={liked}
        onMouseOver={() => console.log('onmouseover')}
        onMouseOut={() => console.log('onmouseout')}
      >
        <GoHeart onClick={onToggleLike}/>
        <span>좋아요 {likesCount}개</span>
      </div>
      <div className='comments'>
        <IoMdChatbubbles />
        <span>댓글 {comments.length}개</span>
      </div>
    </div>
  );
};

export default PostFooter;