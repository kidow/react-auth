import React from 'react';
import './PostList.scss'
import Masonry from 'react-masonry-component'
import PostItem from '../PostItem';

const PostList = ({posts}) => {
  const postList = posts.map(post => {
    return <PostItem key={post.get('_id')} post={post}/>
  })
  return (
    <div className='post-list'>
      <Masonry options={{gutter: 16}}>
        {postList}
      </Masonry>
    </div>
  );
};

export default PostList;