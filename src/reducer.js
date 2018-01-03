import * as types from './actionTypes';
import initialState from './initialState';

const setCase = (colors, currentCase) => {
  if (currentCase === 'Uppercase') {
    colors = colors.map(color => color.toUpperCase());
  } else {
    colors = colors.map(color => color.toLowerCase());
  }

  return colors;
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPLOAD_IMAGE: {
      if (!action.colors) {
        return state;
      }

      let newState = JSON.parse(JSON.stringify(state));
      newState.loaded = true;
      newState.colors = setCase(action.colors, newState.case);

      return newState;
    }

    case types.CHANGE_NUM_SWATCHES: {
      let newState = JSON.parse(JSON.stringify(state));

      newState.numSwatches = Number(action.numSwatches);

      if (newState.loaded) {
        newState.colors = setCase(action.colors, newState.case);
      }

      return newState;
    }

    case types.SWAP_CASE: {
      let newState = JSON.parse(JSON.stringify(state));

      newState.case = action.case;
      newState.colors = setCase(newState.colors, newState.case);

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
