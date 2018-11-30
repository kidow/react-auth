import React from 'react';

import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import { PostFooter } from 'components/Shared'
import './PostItem.scss'
import CommentBlockContainer from 'containers/Shared/CommentBlockContainer';
import { Link } from 'react-router-dom'
import scuize from 'lib/scuize'
import Avatar from 'react-avatar'

const formatter = buildFormatter(koreanStrings)

const PostItem = ({image, post, onToggleLike, onCommentClick}) => {
  const { _id, count, username, content, createdAt, liked, likesCount, comments } = post.toJS()
  const toggleLike = () => onToggleLike({
    postId: _id,
    liked
  })
  const commentClick = () => onCommentClick(_id)
  return (
    <div className='post-item'>
      <div className='head'>
        <Avatar
          src={`${image}`}
          className='user-thumbnail'
          image={`/api/users/${username}/thumbnail`}
          name={username}
          size='32'
        />
        <Link to={`/@${username}`} className='username'>{username}</Link>
        <div className='count'>#{count}번째 생각</div>
        <div className='time'><TimeAgo date={createdAt} formatter={formatter} /></div>
      </div>
      <div className='content'>
        {content}
      </div>
      <PostFooter 
        likesCount={likesCount}
        onToggleLike={toggleLike} 
        onCommentClick={commentClick}
        comments={comments}
      />
      <CommentBlockContainer post={post}/>
    </div>
  );
};

export default scuize(PostItem, function(nextProps, nextState) {
  return this.props.post !== nextProps.post
});