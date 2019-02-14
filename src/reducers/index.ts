import { combineReducers } from 'redux';
import { addressReducer } from './addressReducers';
import { cartReducer } from './cartReducers';
import { loginReducer } from './loginReducers';
import { paymentInfoReducer } from './paymentInfoReducer';
import snackbarReducers, { SnackbarState } from './snackbarReducers';

interface State {
  snackbar: SnackbarState;
}

const reducers = combineReducers({
  snackbar: snackbarReducers,
  loginDetails: loginReducer,
  cart: cartReducer,
  address: addressReducer,
  paymentInfo: paymentInfoReducer,
});

export type StoreState = State;
export default reducers;
