import React from 'react';
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import './PostItem.scss'

const formatter = buildFormatter(koreanStrings)

const PostItem = ({image}) => {
  return (
    <div className='post-item'>
      <div className='post-head'>
        <div 
          style={{backgroundImage: `url(${image})`}}
          className='post-user-thumbnail'
          image={`/api/users/kidow/thumbnail`}
        />
        <div className='post-username'>Kidow</div>
        <div className='post-count'>#1번째 생각</div>
        <div className='post-time'><TimeAgo date={new Date()} formatter={formatter} /></div>
      </div>
      <div className='post-content'>
        내용
      </div>
    </div>
  );
};

export default PostItem;