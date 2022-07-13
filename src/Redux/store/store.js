import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/RootReducers';


// const persistStoreReducer = persistReducer(persistConfig, rootReducer);

export const configStore = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
export default configStore;
