import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as baseActions from 'store/base'
import * as userActions from 'store/user'
import storage from 'lib/storage'
import { UserMenu, UserName, UserMenuItem } from 'components/Base'
import onClickOutside from 'react-onclickoutside'

class UserMenuContainer extends Component {
  handleClickOutside = (e) => {
    const { BaseActions } = this.props
    BaseActions.setUserMenuVisibility(false)
  }

  handleLogout = async () => {
    const { UserActions } = this.props
    try {
      await UserActions.logout()
    } catch (e) {
      console.log(e)
    }
    storage.remove('loggedInfo')
    window.location.reload()
  }

  render() {
    const { username, visible } = this.props
    const { handleLogout } = this
    if (!visible) return null
    return (
      <UserMenu>
        <UserName username={username}/>
        <UserMenuItem>나의 흐름</UserMenuItem>
        <UserMenuItem>설정</UserMenuItem>
        <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
      </UserMenu>
    )
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(['userMenu', 'visible']),
    username: state.user.getIn(['loggedInfo', 'username'])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(onClickOutside(UserMenuContainer))