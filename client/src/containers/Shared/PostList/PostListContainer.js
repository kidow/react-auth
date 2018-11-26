import React, { Component } from 'react'
import PostList from 'components/Shared/PostList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postsActions from 'store/posts'

class PostListContainer extends Component {
  load = async () => {
    const { PostsActions } = this.props
    PostsActions.lodaPost()
  }

  componentDidMount() {
    this.load()
  }
  
  render() {
    return (
      <PostList />
    )
  }
}

export default connect(
  state => ({
    next: state.posts.get('next'),
    data: state.posts.get('data')
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(PostListContainer)