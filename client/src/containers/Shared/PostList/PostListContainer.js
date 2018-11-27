import React, { Component } from 'react'
import { PostList } from 'components/Shared'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postsActions from 'store/posts'

class PostListContainer extends Component {
  prev = null
  
  load = async () => {
    const { PostsActions } = this.props
    try {
      await PostsActions.loadPost()
      const { next } = this.props
      if (next) {
        await PostsActions.prefetchPost(next)
      }
    } catch (e) {
      console.log(e)
    }
  }

  loadNext = async () => {
    const { PostsActions, next } = this.props
    PostsActions.showPrefetchedPost()
    if (next === this.prev || !next) return
    this.prev = next

    try {
      await PostsActions.prefetchPost(next)
    } catch (e) {
      console.log(e)
    }
    this.handleScroll()
  }

  handleScroll = () => {
    const { nextData } = this.props
    if (!nextData.size) return

    const { innerWidth } = window
    const { scrollHeight } = document.body
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop

    if (scrollHeight - innerWidth - scrollTop < 100) {
      this.loadNext()
    }
  }

  componentDidMount() {
    this.load()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  
  render() {
    const { data } = this.props
    return (
      <PostList posts={data}/>
    )
  }
}

export default connect(
  state => ({
    next: state.posts.get('next'),
    data: state.posts.get('data'),
    nextData: state.posts.get('nextData')
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(PostListContainer)