import React, { Component } from 'react'
import { WritePost } from 'components/Home'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from 'store/home'
import * as userActions from 'store/user'
import { toast } from 'react-toastify'

class WritePostContainer extends Component {
  handleChange = e => {
    const { HomeActions } = this.props
    HomeActions.changeWritePostInput(e.target.value)
  }

  handlePost = async () => {
    const { HomeActions, value } = this.props
    const message = message => (<div style={{fontSize: '1.1rem'}}>{message}</div>)

    if (value.length < 5) {
      HomeActions.changeWritePostInput('')
      return toast(message(' 너무 짧습니다. 5자 이상 입력하세요.'), { type: 'error' })
    }

    if (value.length > 1000) {
      HomeActions.changeWritePostInput('')
      return toast(message(' 최대 1000자까지 입력할 수 있습니다.'), { type: 'error' })
    }

    try {
      await HomeActions.writePost(value)
      toast(message('글이 작성되었습니다.'), { type: 'success' })
    } catch (e) {
      toast(message('오류가 발생되었습니다.',), { type: 'error' })
    }
  }
  render() {
    const { handleChange, handlePost } = this
    const { value, logged } = this.props
    return (
      <WritePost 
        onChange={handleChange}
        onPost={handlePost}
        value={value}
        logged={logged}
      />
    )
  }
}

export default connect(
  state => ({
    value: state.home.getIn(['writePost', 'value']),
    logged: state.user.get('logged')
  }),
  dispatch => ({
    HomeActions: bindActionCreators(homeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(WritePostContainer)