import React from 'react';
import { Link } from 'react-router-dom'
import './AuthWrapper.scss'

const AuthWrapper = ({children}) => {
  return (
    <div className='auth-wrapper'>
      <div className='shadowed-box'>
        <div className='logo-wrapper'>
          <Link className='logo' to='/'>KIDOW</Link>
        </div>
        <div className='contents'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;