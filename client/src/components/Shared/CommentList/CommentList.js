import React, { Component } from 'react';
import CommentItem from '../CommentItem';

class CommentList extends Component {
  render() {
    const { comments } = this.props
    if (!comments.size) return null

    const commentList = comments.map(comment => {
      return <CommentItem {...comment.toJS()} key={comment.get('_id')}/>
    })
    return (
      <div style={{marginTop: '0.75rem'}}>
        {commentList}
      </div>
    );
  }
}

export default CommentList;