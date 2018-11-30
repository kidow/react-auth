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
    const { logged, visible, thumbnail, username } = this.props
    const { handleThumbnailClick } = this
    if (!visible) return null
    return (
      <Header>
        {logged ? (
          <UserThumbnail 
            thumbnail={thumbnail} 
            onClick={handleThumbnailClick}
            name={username}
          />
        ) : (
          <LoginButton />
        )}
        <UserMenuContainer />
      </Header>
    );
  }
}

export default connect(
  state => ({
    logged: state.user.get('logged'),
    visible: state.base.getIn(['header', 'visible']),
    thumbnail: state.user.getIn(['loggedInfo', 'thumbnail']),
    username: state.user.getIn(['loggedInfo', 'username'])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);