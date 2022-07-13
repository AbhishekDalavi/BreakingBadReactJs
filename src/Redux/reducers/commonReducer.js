import * as type from '../../shared/Constants/actionTypes';

const initialState = {
  loadingCharacters: false,
  characters: [],
  searchedCharacters: []
};
export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ALL_CHARACTER_REQUEST: {
      return {
        ...state,
        loadingCharacters: true,
      };
    }
    case type.ALL_CHARACTER_SUCCESS: {
      return {
        ...state,
        loadingCharacters: false,
        characters: action.payload
      }
    }
    case type.ALL_SEARCHED_CHARACTER_SUCCESS: {
      return {
        ...state,
        loadingCharacters: false,
        searchedCharacters: action.payload
      }
    }
    case type.ALL_CHARACTER_FAIL: {
      return {
        ...state,
        loadingCharacters: false,
      }
    }
    default:
      return state;
  }
};
