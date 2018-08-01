import 'rxjs';

import {
  PING,
} from '~/containers/InjectorTest/constants';

import {
  pong,
} from '~/containers/InjectorTest/actions';

export default (action$, store) => action$.ofType(PING)
  .delay(1000) // Asynchronously wait 1000ms then continue
  .mergeMap(action => new Promise((resolve) => {
    // console.log('App action :', action);
    // setTimeout(() => {
    //   store.dispatch(ping());
    // }, 2000);
    resolve(pong());
  }));
