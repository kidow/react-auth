import React, { Component } from 'react';
import { CommentBlock } from 'components/Shared';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postsActions from 'store/posts'

class CommentBlockContainer extends Component {
  handleChange = e => {
    const { value } = e.target
    const { PostsActions, post } = this.props
    PostsActions.changeCommentInput({
      postId: post.get('_id'),
      value
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.comment()
    }
  }

  comment = () => {
    const { PostsActions, post, status } = this.props
    const value = status.get('value')
    if (value) {
      PostsActions.comment({
        postId: post.get('_id'),
        text: value
      })
    }
  }
  render() {
    const { status, post, logged } = this.props
    const { visible, value } = status ? status.toJS() : {}
    const { handleChange, handleKeyPress } = this

    if (!visible) return null

    return (
      <CommentBlock 
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        comments={post.get('comments')}
        logged={logged}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    status: state.posts.getIn(['comments', ownProps.post.get('_id')]),
    logged: state.user.get('logged')
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(CommentBlockContainer);