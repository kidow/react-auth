import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api/posts'

const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT'
const WRITE_POST = 'home/WRITE_POST'

export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT)
export const writePost = createAction(WRITE_POST, api.write)

const initialState = Map({
  writePost: Map({
    value: ''
  })
})

export default handleActions({
  [CHANGE_WRITE_POST_INPUT]: (state, action) => {
    return state.setIn(['writePost', 'value'], action.payload)
  },
  ...pender({
    type: WRITE_POST,
    onPending: (state, action) => {
      return state.setIn(['writePost', 'value'], '')
    }
  })
}, initialState) 