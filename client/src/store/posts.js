import { createAction, handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'
import * as api from 'lib/api/posts'
import { pender } from 'redux-pender'

const LOAD_POST = 'posts/LOAD_POST'
const PREFETCH_POST = 'posts/PREFETCH_POST'
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST'

export const loadPost = createAction(LOAD_POST, api.list)
export const prefetchPost = createAction(PREFETCH_POST, api.next)
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST)

const initialState = Map({
  next: '',
  data: List(),
  nextData: List()
})

export default handleActions({
  ...pender({
    type: LOAD_POST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data
      return state.set('next', next)
                  .set('data', fromJS(data))
    }
  }),
  ...pender({
    type: PREFETCH_POST,
    onSuccess: (state, action) => {
      const { next, data } = action.payload.data
      return state.set('next', next)
                  .set('nextData', fromJS(data))
    }
  }),
  [SHOW_PREFETCHED_POST]: (state, action) => {
    const nextData = state.get('nextData')
    return state.update('data', data => data.concat(nextData))
                .set('nextData', List())
  }
}, initialState) 