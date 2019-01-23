// Import the dependent modules
import { action } from 'typesafe-actions';

import { LoginInterface } from '../components/login/Login.interface';
import ActionType from '../types/ActionType';

export interface FetchLogin {
  type: ActionType.FETCH_LOGIN;
  payload: LoginInterface;
}

export const fetchLogin = (data: LoginInterface) => action(ActionType.FETCH_LOGIN, data);
