import {
  GREET,
} from './constants';

export default (state = { greetName: '' }, action) => {
  switch (action.type) {
  case GREET:
    return { greetName: action.name };

  default:
    return state;
  }
};
