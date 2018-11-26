import { Map } from 'immutable'
import { handleActions, createAction } from 'redux-actions'

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY'

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY)
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY)

const initialState = Map({
  header: Map({
    visible: true
  }),
  userMenu: Map({
    visible: false
  })
})

export default handleActions({
  [SET_HEADER_VISIBILITY]: (state, action) => {
    return state.setIn(['header', 'visible'], action.payload)
  },
  [SET_USER_MENU_VISIBILITY]: (state, action) => {
    return state.setIn(['userMenu', 'visible'], action.payload)
  }
}, initialState)