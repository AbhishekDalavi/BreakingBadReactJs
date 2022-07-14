import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/RootReducers';


export const configStore = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
export default configStore;
