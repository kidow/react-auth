import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Base/Header';
import LoginButton from 'components/Base/LoginButton'

class HeaderContainer extends Component {
  render() {
    return (
      <Header>
        <LoginButton />
      </Header>
    );
  }
}

export default connect(
  state => ({
    
  }),
  dispatch => ({

  })
)(HeaderContainer);