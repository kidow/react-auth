import React from 'react';
import './PostList.scss'
import Masonry from 'react-masonry-component'

const Post = () => <div className='post'/>

const PostList = () => {
  return (
    <div className='post-list'>
      <Masonry options={{gutter: 16}}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Masonry>
    </div>
  );
};

export default PostList;