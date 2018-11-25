import base from './base'
import auth from './auth'
import { combineReducers } from 'redux'

export default combineReducers({
  base,
  auth
})