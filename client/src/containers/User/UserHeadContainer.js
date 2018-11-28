import React, { Component } from 'react';
import { UserHead } from 'components/User';

class UserHeadContainer extends Component {
  render() {
    const { username } = this.props
    return (
      <UserHead username={username}/>
    );
  }
}

export default UserHeadContainer;