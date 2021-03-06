import React, { Component } from 'react'
import { PostList } from 'components/Shared'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postsActions from 'store/posts'

import { toast } from 'react-toastify'
import { setRelayoutHandler } from 'lib/withRelayout'
import Loading from 'components/Loading';

class PostListContainer extends Component {
  prev = null
  
  load = async () => {
    const { PostsActions, username } = this.props
    try {
      await PostsActions.loadPost(username)
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
    if (nextData.size === 0) return

    const { innerWidth } = window
    const { scrollHeight } = document.body
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop

    if (scrollHeight - innerWidth - scrollTop < 100) {
      this.loadNext()
    }
  }

  handleToggleLike = ({postId, liked}) => {
    const { PostsActions, logged } = this.props
    
    const message = message => (<div style={{fontSize: '1.1rem'}}>{message}</div>)
    if (!logged) {
      return toast(message(' 로그인 후 이용하실 수 있습니다.'), { type: 'error' })
    }
    if (liked) {
      PostsActions.dislikePost(postId)
    } else {
      PostsActions.likePost(postId)
    }
  }

  handleCommentClick = postId => {
    const { PostsActions } = this.props
    PostsActions.toggleComment(postId)
    setTimeout(() => this.masonry.masonry.layout(), 0);
  }

  handleRelayout = () => {
    setTimeout(() => this.masonry.masonry.layout(), 0);
  }

  componentDidMount() {
    this.load()
    window.addEventListener('scroll', this.handleScroll)
    setRelayoutHandler(this.handleRelayout)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.username !== this.props.username) {
      this.load()
    }
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  render() {
    const { data, loading } = this.props
    const { handleToggleLike, handleCommentClick } = this
    return (
      <>
        {loading ? (
          <Loading/>
        ) : (
          <PostList
            posts={data}
            onToggleLike={handleToggleLike}
            onCommentClick={handleCommentClick}
            masonryRef={ref => this.masonry = ref}
          />
        )}
      </>
    )
  }
}

export default connect(
  state => ({
    next: state.posts.get('next'),
    data: state.posts.get('data'),
    nextData: state.posts.get('nextData'),
    logged: state.user.get('logged'),
    loading: state.pender.pending['posts/LOAD_POST']
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(PostListContainer)