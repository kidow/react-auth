import React from 'react';
import HeaderContainer from '../containers/Base/HeaderContainer';
import LoginButton from '../components/Base/LoginButton'

const HomePage = () => {
  return (
    <div>
      <HeaderContainer>
        <LoginButton />
      </HeaderContainer>
    </div>
  );
};

export default HomePage;