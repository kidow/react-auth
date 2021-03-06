import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as api from 'lib/api/auth';
import { pender } from 'redux-pender';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT, api.logout);
export const checkStatus = createAction(CHECK_STATUS, api.checkStatus);

const initialState = Map({
  loggedInfo: Map({
    thumbnail: null,
    username: null
  }),
  logged: false,
  validated: false
});

export default handleActions({
  [SET_LOGGED_INFO]: (state, action) => {
    return state.set('loggedInfo', Map(action.payload)).set('logged', true)
  },
  [SET_VALIDATED]: (state, action) => {
    return state.set('validated', action.payload)
  },
  ...pender({
    type: CHECK_STATUS,
    onSuccess: (state, action) => {
      return state.set('loggedInfo', Map(action.payload.data)).set('validated', true)
    },
    onFailure: (state, action) => initialState
  })
}, initialState);