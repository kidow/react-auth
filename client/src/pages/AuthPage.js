import React from 'react';
import { AuthWrapper } from 'components/Auth';
import { Route } from 'react-router-dom'

import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as baseActions from 'store/base'

class AuthPage extends React.Component {
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false)
  }
  
  componentWillUnmount() {
    this.props.BaseActions.setHeaderVisibility(true)
  }
  
  render() {
    return (
      <AuthWrapper>
        <Route path='/auth/login' component={Login} />
        <Route path='/auth/register' component={Register} />
      </AuthWrapper>
    );
  };
}

export default connect(
  null,
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(AuthPage);