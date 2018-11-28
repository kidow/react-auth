import { createAction, handleActions } from 'redux-actions'
import { Map, fromJS } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api/users'

const GET_USER_INFO = 'userPage/GET_USER_INFO'

export const getUserInfo = createAction(GET_USER_INFO, api.getUserInfo)

const InitialState = Map({
  info: Map({
    profile: Map({
      thumbnail: null,
      username: null
    }),
    thoughtCount: null
  })
})

export default handleActions({
  ...pender({
    type: GET_USER_INFO,
    onSuccess: (state, action) => {
      return state.set('info', fromJS(action.payload.data))
    }
  })
}, InitialState)