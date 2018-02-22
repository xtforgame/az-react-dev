import {
  GREET,
  LOGIN,
  LOGOUT,
  REMEMBER_ME,
} from './constants';

export const greet = (name) => ({ type: GREET, name });
export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const rememberMe = (rememberUser) => ({ type: REMEMBER_ME, rememberUser });
