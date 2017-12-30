import * as types from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPLOAD_IMAGE: {
      console.log('Image uploaded');

      return state;
    }

    default:
      return state;
  }
};

export default reducer;
