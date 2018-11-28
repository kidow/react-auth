import React from 'react';
import './PostFooter.scss'

import HeartIcon from 'react-icons/lib/go/heart'
import CommentIcon from 'react-icons/lib/io/chatbubble'

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
        <HeartIcon onClick={onToggleLike}/>
        <span>좋아요 {likesCount}개</span>
      </div>
      <div className='comments'>
        <CommentIcon />
        <span>댓글 {comments.length}개</span>
      </div>
    </div>
  );
};

export default PostFooter;