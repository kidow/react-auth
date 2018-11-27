import React from 'react';
import './AuthError.scss'

const AuthError = ({children}) => {
  return (
    <div className='auth-error'>
      {children}
    </div>
  );
};

export default AuthError;