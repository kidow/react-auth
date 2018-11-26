import React, { Component } from 'react';
import WritePost from 'components/Home/WritePost';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from 'store/home';

class WritePostContainer extends Component {
  handleChange = e => {
    const { HomeActions } = this.props
    HomeActions.changeWritePostInput(e.target.value)
  }

  handlePost = () => {
    const { HomeActions } = this.props
    HomeActions.changeWritePostInput('')
    console.log('posted!')
  }
  render() {
    const { handleChange, handlePost } = this
    const { value } = this.props
    return (
      <WritePost 
        onChange={handleChange}
        onPost={handlePost}
        value={value}
      />
    );
  }
}

export default connect(
  state => ({
    value: state.home.getIn(['writePost', 'value'])
  }),
  dispatch => ({
    HomeActions: bindActionCreators(homeActions, dispatch)
  })
)(WritePostContainer);