import React, { Component } from 'react'
import { UserMenu, UserName, UserMenuItem } from 'components/Base'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as baseActions from 'store/base'
import * as userActions from 'store/user'

import storage from 'lib/storage'
import onClickOutside from 'react-onclickoutside'
import PropTypes from 'prop-types'

class UserMenuContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleClickOutside = (e) => {
    const { BaseActions } = this.props
    BaseActions.setUserMenuVisibility(false)
  }

  handleOpenMyHeurm = () => {
    const { router } = this.context
    const { username, BaseActions } = this.props
    router.history.push(`/@${username}`)
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
    window.location.href = '/'
  }

  render() {
    const { username, visible } = this.props
    const { handleLogout, handleOpenMyHeurm } = this
    if (!visible) return null
    return (
      <UserMenu>
        <UserName username={username}/>
        <UserMenuItem onClick={handleOpenMyHeurm}>나의 흐름</UserMenuItem>
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