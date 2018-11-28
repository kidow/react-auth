import React from 'react';
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { PostFooter } from 'components/Shared'
import './PostItem.scss'

const formatter = buildFormatter(koreanStrings)

const PostItem = ({image, post, onToggleLike, liked, likesCount}) => {
  const { count, username, content, createdAt } = post.toJS()
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
      <PostFooter />
    </div>
  );
};

export default PostItem;