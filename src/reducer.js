import * as types from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPLOAD_IMAGE: {
      let newState = Object.assign({}, state);

      if (!action.averageColor) {
        return state;
      }

      let averageColor = action.averageColor;

      newState.averageColor = `#${averageColor.red}${averageColor.green}${averageColor.blue}`;

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
