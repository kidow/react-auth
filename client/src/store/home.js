import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';

export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT);

const initialState = Map({
  writePost: Map({
    value: ''
  })
});

export default handleActions({
  [CHANGE_WRITE_POST_INPUT]: (state, action) => {
    return state.setIn(['writePost', 'value'], action.payload)
  }
}, initialState); 