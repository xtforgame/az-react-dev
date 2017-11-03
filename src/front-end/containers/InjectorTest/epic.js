import 'rxjs';
import { push } from 'react-router-redux';
// import { LOCATION_CHANGE } from 'react-router-redux';

import {
  PING,
} from './constants';

import {
  pong,
} from './actions';

import {
  greet,
} from '~/containers/App/actions';

export default (action$, store) => {
  return action$.ofType(PING)
    .delay(1000)
    .mergeMap(action =>
      new Promise(resolve => {
        console.log('InjectorTest epic :', action);
        // console.log('store :', store);
        store.dispatch(pong());
        store.dispatch(push('/'));

        setTimeout(() => {
          resolve(greet('Rick')); // Should be canceled by dynamic epic loading
        }, 20);
      })
    )
    // .takeUntil(action$.ofType(LOCATION_CHANGE));
};
