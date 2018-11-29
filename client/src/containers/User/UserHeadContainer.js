import React, { Component } from 'react';
import { UserHead } from 'components/User';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as userPageActions from 'store/userPage'

class UserHeadContainer extends Component {
  getUserInfo = () => {
    const { UserPageActions, username } = this.props
    try {
      UserPageActions.getUserInfo(username)
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username !== this.props.username) {
      this.getUserInfo()
    }
  }
  
  render() {
    const { username, thumbnail, throughCount, fetched } = this.props
    if (!fetched) return null
    return (
      <UserHead 
        username={username}
        thumbnail={thumbnail}
        throughCount={throughCount}
      />
    );
  }
}

export default connect(
  state => ({
    thumbnail: state.userPage.getIn(['info', 'profile', 'thumbnail']),
    throughCount: state.userPage.getIn(['info', 'thoughtCount']),
    fetched: state.pender.success['userPage/GET_USER_INFO']
  }),
  dispatch => ({
    UserPageActions: bindActionCreators(userPageActions, dispatch)
  })
)(UserHeadContainer);