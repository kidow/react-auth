import { createAction, handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'
import * as api from 'lib/api/posts'
import { pender } from 'redux-pender'

const LOAD_POST = 'posts/LOAD_POST'
const PREFETCH_POST = 'posts/PREFETCH_POST'
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST'
const RECEIVE_NEW_POST = 'posts/RECEIVE_NEW_POST'
const LIKE_POST = 'posts/LIKE_POST'
const DISLIKE_POST = 'posts/DISLIKE_POST' 

export const loadPost = createAction(LOAD_POST, api.list)
export const prefetchPost = createAction(PREFETCH_POST, api.next)
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST)
export const likePost = createAction(LIKE_POST, api.like, payload => payload)
export const dislikePost = createAction(DISLIKE_POST, api.dislike, payload => payload)

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
  },
  [RECEIVE_NEW_POST]: (state, action) => {
    return state.update('data', data => data.unshift(fromJS(action.payload)))
  },
  ...pender({
    type: LIKE_POST,
    onPending: (state, action) => {
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta)
      return state.updateIn(
        ['data', index],
        post => post.set('liked', true)
                    .update('likedCount', count => count++)
      )
    },
    onSuccess: (state, action) => {
      const { data: { likesCount } } = action.payload
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta)
      return state.setIn(['data', index, 'likesCount'], likesCount)
    }
  }),
  ...pender({
    type: DISLIKE_POST,
    onPending: (state, action) => {
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta);
      return state.updateIn(
        ['data', index],
        post => post.set('liked', true)
                    .update('likedCount', count => count--)
      )
    },
    onSuccess: (state, action) => {
      const { data: { likesCount } } = action.payload
      const index = state.get('data').findIndex(post => post.get('_id') === action.meta)
      return state.setIn(['data', index, 'likesCount'], likesCount)
    }
  })
}, initialState) 