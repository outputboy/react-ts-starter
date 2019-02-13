import { combineReducers } from 'redux';
import { addressReducer } from './addressReducers';
import { cartReducer } from './cartReducers';
import { loginReducer } from './loginReducers';
import snackbarReducers, { SnackbarState } from './snackbarReducers';

interface State {
  snackbar: SnackbarState;
}

const reducers = combineReducers({
  snackbar: snackbarReducers,
  loginDetails: loginReducer,
  cart: cartReducer,
  address: addressReducer,
});

export type StoreState = State;
export default reducers;
