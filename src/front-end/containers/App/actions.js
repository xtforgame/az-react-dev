import {
  GREET,
  LOGIN,
  LOGOUT,
} from './constants';

export const greet = (name) => ({ type: GREET, name });
export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
