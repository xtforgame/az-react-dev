import 'rxjs';
import { push } from 'react-router-redux';

import {
  PING,
} from '~/containers/RoTest/constants';

import {
  ping,
  pong,
} from '~/containers/RoTest/actions';

export default (action$, store) => {
  return action$.ofType(PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mergeMap(action =>
      new Promise(resolve => {
        console.log('action :', action);
        // setTimeout(() => {
        //   store.dispatch(ping());
        // }, 2000);
        resolve(pong());
      })
    );
};
