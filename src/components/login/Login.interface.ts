export interface LoginInterface {
  username: string;
  password: string;
}

export interface LoginPropsInterface {
  fetchLogin?: (data: LoginInterface) => void;
}
