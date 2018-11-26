import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Base/Header';
import LoginButton from 'components/Base/LoginButton'
import * as userActions from 'store/user'
import { bindActionCreators } from 'redux'
import storage from 'lib/storage'

class HeaderContainer extends Component {
  handleLogout = async () => {
    const { UserActions } = this.props
    try {
      await UserActions.logout()
    } catch (e) {
      console.log(e)
    }
    storage.remove('loggedInfo')
    window.location.href = '/'
  }

  render() {
    const { handleLogout } = this
    const { user } = this.props
    return (
      <Header>
        {user.get('logged') ? (
          <div>
            {user.getIn(['loggedInfo', 'username'])}
            <div onClick={handleLogout}>로그아웃</div>
          </div>
        ) : (
          <LoginButton />
        )}
      </Header>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);