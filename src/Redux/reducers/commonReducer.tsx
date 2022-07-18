import * as type from '../../shared/Constants/actionTypes';

interface intitalStateInterface{
  loadingCharacters: boolean,
  characters: Array<[]>,
  favoriteCharacterList: Array<[]>
}

const initialState : intitalStateInterface = {
  loadingCharacters: false,
  characters: [],
  favoriteCharacterList: []
};

export const commonReducer = (state = initialState, action: any ) => {
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
    case type.ALL_CHARACTER_FAIL: {
      return {
        ...state,
        loadingCharacters: false,
      }
    }
    case type.ALL_FAVORITE_LIST:{
      return {
        ...state,
        favoriteCharacterList: action.payload,
      }
    }
    default:
      return state;
  }
};
