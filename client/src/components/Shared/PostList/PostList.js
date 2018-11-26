import React from 'react';
import './PostList.scss'
import Masonry from 'react-masonry-component'
import PostItem from '../PostItem';

const PostList = () => {
  return (
    <div className='post-list'>
      <Masonry options={{gutter: 16}}>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </Masonry>
    </div>
  );
};

export default PostList;