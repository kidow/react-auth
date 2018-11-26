import React from 'react';
import './WritePost.scss'
import TextArea from 'react-textarea-autosize'
import Progress from '../Progress'

const WritePost = ({onChange, onPost, value}) => {
  return (
    <div className='write-post'>
      <TextArea 
        className='textarea'
        minRows={3}
        maxRows={10}
        placeholder={`의식의 흐름대로 당신의 생각을 적어보세요.\n5초이상 아무것도 입력하지 않으면 자동으로 포스팅됩니다.`}
        value={value}
        onChange={onChange}
      />
      <Progress />
    </div>
  );
};

export default WritePost;