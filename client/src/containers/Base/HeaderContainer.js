import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Header, UserThumbnail, LoginButton } from 'components/Base';
import * as userActions from 'store/user'
import * as baseActions from 'store/base'
import { bindActionCreators } from 'redux'
import UserMenuContainer from './UserMenuContainer'

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
        <UserMenuContainer eventTypes="click"/>
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