import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import { loginReducer } from './loginReducers';
import snackbarReducers, { SnackbarState } from './snackbarReducers';

interface State {
  snackbar: SnackbarState;
}

const reducers = combineReducers({
  snackbar: snackbarReducers,
  loginDetails: loginReducer,
  cartDetails: cartReducer,
});

export type StoreState = State;
export default reducers;
