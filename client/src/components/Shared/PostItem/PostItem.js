import React from 'react';
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { PostFooter } from 'components/Shared'
import './PostItem.scss'
import CommentBlockContainer from 'containers/Shared/CommentBlockContainer';

const formatter = buildFormatter(koreanStrings)

const PostItem = ({image, post, onToggleLike}) => {
  const { _id, count, username, content, createdAt, liked, likesCount } = post.toJS()
  const toggleLike = () => onToggleLike({
    postId: _id,
    liked
  })
  return (
    <div className='post-item'>
      <div className='post-head'>
        <div 
          style={{backgroundImage: `url(${image})`}}
          className='post-user-thumbnail'
          image={`/api/users/${username}/thumbnail`}
        />
        <div className='post-username'>{username}</div>
        <div className='post-count'>#{count}번째 생각</div>
        <div className='post-time'><TimeAgo date={createdAt} formatter={formatter} /></div>
      </div>
      <div className='post-content'>
        {content}
      </div>
      <PostFooter likesCount={likesCount} liked={liked} onToggleLike={toggleLike}/>
      <CommentBlockContainer />
    </div>
  );
};

export default PostItem;