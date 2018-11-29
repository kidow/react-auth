import React, { Component } from 'react';
import { HomePage, AuthPage, UserPage } from './pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import { Route } from 'react-router-dom'
import storage from 'lib/storage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/user'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class App extends Component {

  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo')
    if (!loggedInfo) return

    const { UserActions } = this.props
    UserActions.setLoggedInfo(loggedInfo)
    try {
      await UserActions.checkStatus()
    } catch (e) {
      storage.remove('loggedInfo')
      window.location.href = '/auth/login?expired'
    }
  }

  componentDidMount() {
    this.initializeUserInfo()
  }
  
  render() {
    return (
      <div>
        <HeaderContainer />
        <Route exact path='/' component={HomePage}/>
        <Route path='/auth' component={AuthPage}/>
        <Route path='/@:username' component={UserPage}/>
        <ToastContainer style={{zIndex: 20}} hideProgressBar position='bottom-right'/>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
