import base from './base'
import auth from './auth'
import { combineReducers } from 'redux'
import { penderReducer } from 'redux-pender'

export default combineReducers({
  base,
  auth,
  pender: penderReducer
})