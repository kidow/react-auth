import React from 'react';
import './AuthButton.scss'

const AuthButton = ({children, onClick}) => {
  return (
    <div className='auth-button' onClick={onClick}>
      {children}
    </div>
  );
};

export default AuthButton;