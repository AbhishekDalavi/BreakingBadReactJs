import {makeRequest} from '../../ApiCall/Apiservices';
import * as type from '../../shared/Constants/actionTypes';
import { AppDispatch } from '../store/store';

export const getAllCharacters = (method:string, url:string, data:object | null) => {
    return async (dispatch:AppDispatch) => {

      dispatch({type: type.ALL_CHARACTER_REQUEST});
  
      try {
        makeRequest({
            method: method,
            url: url,
            data: data
        })
        .then(async (response:any)=> {
            if(response.status == 200 || response.statusText == 'OK'){
              // console.log("respose", response);
                dispatch({
                    type: type.ALL_CHARACTER_SUCCESS,
                    payload: response.data,
                  });
            }
        })
        .catch((error:object)=>{ dispatch({type: type.ALL_CHARACTER_FAIL}); })

      } catch (error) {
        dispatch({type: type.ALL_CHARACTER_FAIL});
      }
    };
  };

