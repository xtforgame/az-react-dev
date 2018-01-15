import { take, takeEvery, call, put, select, all } from 'redux-saga/effects';

import {
  PING,
} from '~/containers/InjectorTest/constants';

import {
  ping,
  pong,
} from '~/containers/InjectorTest/actions';

function* pingWatcher() {
  console.log('root pingWatcher start');
  yield takeEvery(PING, function* foo(action) {
    console.log('root pingWatcher: pong');
    yield put(pong());
  });
}

export default function* root() {
  yield all([
    call(pingWatcher),
  ]);
}
