import { string } from 'prop-types';
import { combineReducers } from 'redux';
import { loginReducer } from './loginReducers';
import snackbarReducers, { SnackbarState } from './snackbarReducers';

interface State {
  snackbar: SnackbarState;
}

const reducers = combineReducers({
  snackbar: snackbarReducers,
  loginDetails: loginReducer,
});

export type StoreState = State;
export default reducers;
