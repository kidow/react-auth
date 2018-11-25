import React, { Component } from 'react';
import AuthContent from 'components/Auth/AuthContent';
import InputWithLabel from 'components/Auth/InputWithLabel'
import AuthButton from 'components/Auth/AuthButton'
import RightAlignedLink from 'components/Auth/RightAlignedLink'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from 'store/auth'
import { isEmail, isLength, isAlphanumeric } from 'validator'

class Register extends Component {
  setError = message => {
    const { AuthActions } = this.props
    AuthActions.setError({
      form: 'register',
      message
    })
  }

  validate = {
    email: value => {
      if (!isEmail(value)) {
        this.setError('잘못된 이메일 형식입니다.')
        return false
      }
      return true
    },
    username: value => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.')
        return false
      }
      return true
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.setError('비밀번호를 6자 이상 입력하세요.')
        return false
      }
      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true
    },
    passwordConfirm: value => {
      if (this.props.form.get('password') !== value) {
        this.setError('비밀번호가 일치하지 않습니다.');
        return false;
      }
      this.setError(null);
      return true;
    }
  }

  handleChange = e => {
    const { AuthActions } = this.props
    const { name, value } = e.target
    AuthActions.changeInput({ name, value, form: 'register' })
    const validation = this.validate[name](value)
    if (name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
  }

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('register')
  }
  render() {
    const { email, username, password, passwordConfirm } = this.props.form.toJS()
    const { handleChange } = this
    return (
      <AuthContent title='회원가입'>
        <InputWithLabel 
          label='이메일' 
          name='email' 
          placeholder='이메일'
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel 
          label='아이디' 
          name='username' 
          placeholder='아이디'
          value={username}
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
        <InputWithLabel 
          label='비밀번호 확인' 
          name='passwordConfirm' 
          placeholder='비밀번호 확인' 
          type='password'
          value={passwordConfirm}
          onChange={handleChange}
        />
        <AuthButton>회원가입</AuthButton>
        <RightAlignedLink to='/auth/login'>로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.getIn(['register', 'form'])
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);