import {
  PING,
  PONG,
} from './constants';

export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });
