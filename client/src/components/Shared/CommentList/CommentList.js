import React, { Component } from 'react';
import CommentItem from '../CommentItem';
import withRelayout from 'lib/withRelayout'

class CommentList extends Component {
  state = { limit: 5 }

  handleReadMore = () => {
    this.setState({
      limit: this.state.limit + 10
    })
    this.props.onRelayout()
  }
  render() {
    const { comments } = this.props
    const { limit } = this.state
    const { handleReadMore } = this
    if (!comments.size) return null

    const commentList = comments.slice(0, limit).map(comment => {
      return <CommentItem {...comment.toJS()} key={comment.get('_id')}/>
    })
    return (
      <div className='comment-list'>
        {commentList}
        {limit < comments.size && 
          <div onClick={handleReadMore} className='read-more'>{comments.size - limit}개 더 보기</div>
        }
      </div>
    );
  }
}

export default withRelayout(CommentList);