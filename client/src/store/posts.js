import { createAction, handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'
import * as api from 'lib/api/posts'
import { pender } from 'redux-pender'

const LOAD_POST = 'posts/LOAD_POST'

export const loadPost = createAction(LOAD_POST, api.list)

const initialState = Map({
  next: '',
  data: List()
})

export default handleActions({
  ...pender({
    type: LOAD_POST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data
      return state.set('next', next)
                  .set('data', fromJS(data))
    }
  })
}, initialState) 