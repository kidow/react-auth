import React from 'react';
import HeaderContainer from 'containers/Base/HeaderContainer';
import LoginButton from 'components/Base/LoginButton'
import PageWrapper from 'components/Base/PageWrapper';
import WritePostContainer from 'containers/Home/WritePostContainer';

const HomePage = () => {
  return (
    <PageWrapper>
      <WritePostContainer />
    </PageWrapper>
  );
};

export default HomePage;