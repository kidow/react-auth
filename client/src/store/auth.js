import { createAction, handleActions } from 'redux-actions'
import { pender } from 'redux-pender'
import { Map } from 'immutable'
import * as api from 'lib/api/auth'

const CHANGE_INPUT = 'auth/CHANGE_INPUT'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'
const LOGOUT = 'auth/LOGOUT'

const SET_ERROR = 'auth/SET_ERROR'

export const changeInput = createAction(CHANGE_INPUT)
export const initializeForm = createAction(INITIALIZE_FORM)

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, api.checkEmailExists)
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, api.checkUsernameExists)

export const localRegister = createAction(LOCAL_REGISTER, api.localRegister)
export const localLogin = createAction(LOCAL_LOGIN, api.localLogin)
export const logout = createAction(LOGOUT, api.logout)

export const setError = createAction(SET_ERROR)

const initialState = Map({
  register: Map({
    form: Map({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }),
    exists: Map({
      email: false,
      password: false
    }),
    error: null
  }),
  login: Map({
    form: Map({
      email: '',
      password: ''
    }),
    error: null
  }),
  result: Map({})
})

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { form, name, value } = action.payload
    return state.setIn([form, 'form', name], value)
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload)
    return state.set(action.payload, initialForm)
  },
  ...pender({
    type: CHECK_EMAIL_EXISTS,
    onSuccess: (state, action) => {
      const { data: { exists } } = action.payload
      return state.setIn(['register', 'exists', 'email'], exists)
    }
  }),
  ...pender({
    type: CHECK_USERNAME_EXISTS,
    onSuccess: (state, action) => {
      const { data: { exists } } = action.payload
      return state.setIn(['register', 'exists', 'username'], exists)
    }
  }),
  ...pender({
    type: LOCAL_LOGIN,
    onSuccess: (state, action) => {
      const { data } = action.payload
      return state.set('result', Map(data))
    }
  }),
  ...pender({
    type: LOCAL_REGISTER,
    onSuccess: (state, action) => {
      const { data } = action.payload
      return state.set('result', Map(data))
    }
  }),
  [SET_ERROR]: (state, action) => {
    const { form, message } = action.payload;
    return state.setIn([form, 'error'], message);
  }
}, initialState)