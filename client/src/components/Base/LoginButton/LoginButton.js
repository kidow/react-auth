import React from 'react';
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link to='/auth/login' className='login-button'>
      로그인 | 가입 
    </Link>
  );
};

export default LoginButton;