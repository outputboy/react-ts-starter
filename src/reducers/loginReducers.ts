import { FetchLogin } from '../actions/loginActions';
import { LoginInterface } from '../components/login/Login.interface';
import ActionType from '../types/ActionType';

export const initialState: LoginInterface = { username: '', password: '' };

export const loginReducer = (state: LoginInterface = initialState, action: FetchLogin) => {
  switch (action.type) {
    case ActionType.FETCH_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
