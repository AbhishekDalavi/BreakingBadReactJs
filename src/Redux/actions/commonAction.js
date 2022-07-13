import {makeRequest} from '../../ApiCall/Apiservices';
import * as type from '../../shared/Constants/actionTypes';

export const getAllCharacters = (method, url, data, isSearch) => {
    return async (dispatch, getState) => {

      dispatch({type: type.ALL_CHARACTER_REQUEST});
  
      try {
        makeRequest({
            method: method,
            url: url,
            data: data
        })
        .then(async (response)=> {
            if(response.status == 200 || response.statusText == 'OK'){
              console.log("respose", response.data);
                dispatch({
                    type: isSearch ? type.ALL_SEARCHED_CHARACTER_SUCCESS : type.ALL_CHARACTER_SUCCESS,
                    payload: response.data,
                  });
            }
        })
        .catch((error)=>{ dispatch({type: type.ALL_CHARACTER_FAIL}); })

      } catch (error) {
        dispatch({type: type.ALL_CHARACTER_FAIL});
      }
    };
  };