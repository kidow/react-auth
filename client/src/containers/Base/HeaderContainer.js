import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Base/Header';
import LoginButton from 'components/Base/LoginButton'
import * as userActions from 'store/user'
import { bindActionCreators } from 'redux'
import storage from 'lib/storage'
import UserThumbnail from 'components/Base/UserThumbnail/UserThumbnail';

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
    const { user } = this.props
    return (
      <Header>
        {user.get('logged') ? (
          <div>
            {user.getIn(['loggedInfo', 'username'])}
            <UserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])}/>
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