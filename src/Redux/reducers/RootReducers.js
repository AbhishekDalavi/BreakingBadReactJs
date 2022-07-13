import {combineReducers} from 'redux';
import {commonReducer} from './commonReducer';

export const rootReducer = combineReducers({
  commonReducer: commonReducer,
});

// export const rootReducer = (state, action) => {
//   if (action.type === APP_LOGOUT) {
//     AsyncStorage.removeItem('persist:root');
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
