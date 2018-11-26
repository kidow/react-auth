import React from 'react';
import './WritePost.scss'

const WritePost = ({children}) => {
  return (
    <div className='write-post'>
      {children}
    </div>
  );
};

export default WritePost;