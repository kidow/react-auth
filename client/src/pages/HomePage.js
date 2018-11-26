import React from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import WritePostContainer from 'containers/Home/WritePostContainer';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';

const HomePage = () => {
  return (
    <PageWrapper>
      <WritePostContainer />
      <PostListContainer />
    </PageWrapper>
  );
};

export default HomePage;