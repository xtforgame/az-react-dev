import {
  GREET,
  LOGIN,
  LOGOUT,
  REMEMBER_ME,
} from './constants';

export default (state = { greetName: '', isAuthenticated: false }, action) => {
  switch (action.type) {
  case GREET:
    return {
      ...state,
      greetName: action.name,
    };

  case LOGIN:
    return {
      ...state,
      isAuthenticated: true,
    };

  case LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
    };

  case REMEMBER_ME:
    return {
      ...state,
      rememberUser: action.rememberUser,
    };

  default:
    return state;
  }
};
