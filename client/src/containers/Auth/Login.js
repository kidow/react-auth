import React, { Component } from 'react';
import AuthContent from 'components/Auth/AuthContent';
import InputWithLabel from 'components/Auth/InputWithLabel';
import AuthButton from 'components/Auth/AuthButton'
import RightAlignedLink from 'components/Auth/RightAlignedLink'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from 'store/auth'

class Login extends Component {
  handleChange = e => {
    const { AuthActions } = this.props
    const { name, value } = e.target
    AuthActions.changeInput({name, value, form: 'login'})
  }
  render() {
    const { email, password } = this.props.form.toJS()
    const { handleChange } = this
    return (
      <AuthContent title='로그인'>
        <InputWithLabel 
          label='이메일' 
          name='email' 
          placeholder='이메일'
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel 
          label='비밀번호' 
          name='password' 
          placeholder='비밀번호' 
          type='password'
          value={password}
          onChange={handleChange}
        />
        <AuthButton>로그인</AuthButton>
        <RightAlignedLink to='/auth/register'>회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.getIn(['login', 'form'])
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);