import { FetchLogin } from './loginActions';
import snackbarPop, { SnackbarPopAction } from './snackbarPop';
import snackbarPush, { SnackbarPushAction } from './snackbarPush';

export type AppAction = SnackbarPopAction | SnackbarPushAction | FetchLogin;

export { snackbarPop, snackbarPush };
