import {makeRequest} from '../../ApiCall/Apiservices';
import * as type from '../../shared/Constants/actionTypes';
import { AppDispatch, RootState } from '../store/store';

export const getAllCharacters = (method:string, url:string, data:object | null, isSearch:boolean) => {
    return async (dispatch:AppDispatch, getState:RootState) => {

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
                    type: isSearch ? type.ALL_SEARCHED_CHARACTER_SUCCESS : type.ALL_CHARACTER_SUCCESS,
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