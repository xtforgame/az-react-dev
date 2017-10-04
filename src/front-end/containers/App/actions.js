import {
  GREET,
} from './constants';

export const greet = (name) => ({ type: GREET, name });
