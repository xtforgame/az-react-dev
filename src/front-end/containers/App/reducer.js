import {
  GREET,
  LOGIN,
  LOGOUT,
} from './constants';

export default (state = { greetName: '', isAuthenticated: false }, action) => {
  switch (action.type) {
  case GREET:
    return {
      ...state,
      greetName: action.name
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

  default:
    return state;
  }
};
