import React from 'react';
import './AuthButton.scss'

const AuthButton = ({children, onClick}) => {
  return (
    <div className='button-wrapper' onClick={onClick}>
      {children}
    </div>
  );
};

export default AuthButton;