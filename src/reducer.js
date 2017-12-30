import * as types from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPLOAD_IMAGE: {
      if (!action.colors) {
        return state;
      }

      let newState = JSON.parse(JSON.stringify(state));
      newState.colors = action.colors;

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
