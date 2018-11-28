import React, { Component } from 'react';
import { CommentBlock } from 'components/Shared';
import { connect } from 'react-redux'

class CommentBlockContainer extends Component {
  render() {
    const { status } = this.props
    const { visible, value } = status ? status.toJS() : {}
    return (
      <CommentBlock value={value}/>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    status: state.posts.getIn(['comments', ownProps.post.get('_id')])
  })
)(CommentBlockContainer);