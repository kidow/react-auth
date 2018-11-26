import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Base/Header';
import LoginButton from 'components/Base/LoginButton'
import * as userActions from 'store/user'
import * as baseActions from 'store/base'
import { bindActionCreators } from 'redux'
import UserThumbnail from 'components/Base/UserThumbnail'
import UserMenuContainer from './UserMenuContainer'

class HeaderContainer extends Component {
  handleThumbnailClick = () => {
    const { BaseActions } = this.props
    BaseActions.setUserMenuVisibility(true)
  }

  render() {
    const { user } = this.props
    const { handleThumbnailClick } = this
    return (
      <Header>
        {user.get('logged') ? (
          <div>
            {user.getIn(['loggedInfo', 'username'])}
            <UserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])} onClick={handleThumbnailClick}/>
          </div>
        ) : (
          <LoginButton />
        )}
        <UserMenuContainer eventTypes="click"/>
      </Header>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);