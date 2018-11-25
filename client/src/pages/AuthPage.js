import React from 'react';
import AuthWrapper from '../components/Auth/AuthWrapper';
import { Route } from 'react-router-dom'
import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';

const AuthPage = () => {
  return (
    <AuthWrapper>
      <Route path='/auth/login' component={Login}/>
      <Route path='/auth/register' component={Register}/>
    </AuthWrapper>
  );
};

export default AuthPage;