import { useDispatch } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/RootReducers';


 const configStore = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
export default configStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof configStore.getState>
export type AppDispatch = typeof configStore.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types