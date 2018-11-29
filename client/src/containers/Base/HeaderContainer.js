import React, { Component } from 'react';
import { Header, UserThumbnail, LoginButton } from 'components/Base';
import UserMenuContainer from './UserMenuContainer'

import { connect } from 'react-redux'
import * as userActions from 'store/user'
import * as baseActions from 'store/base'
import { bindActionCreators } from 'redux'

class HeaderContainer extends Component {
  handleThumbnailClick = () => {
    const { BaseActions } = this.props
    BaseActions.setUserMenuVisibility(true)
  }

  render() {
    const { user, visible } = this.props
    const { handleThumbnailClick } = this
    if (!visible) return null
    return (
      <Header>
        {user.get('logged') ? (
          <UserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])} onClick={handleThumbnailClick}/>
        ) : (
          <LoginButton />
        )}
        <UserMenuContainer/>
      </Header>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    visible: state.base.getIn(['header', 'visible'])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);