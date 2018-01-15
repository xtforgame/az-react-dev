import { take, takeEvery, call, put, select, all } from 'redux-saga/effects';

import {
  PING,
} from '~/containers/InjectorTest/constants';

import {
  ping,
  pong,
} from '~/containers/InjectorTest/actions';

function* pingWatcher() {
  console.log('inject test pingWatcher start');
  yield takeEvery(PING, function* foo(action) {
    console.log('inject test pingWatcher: pong');
    yield put(pong());
  });
}

export default function* root() {
  yield all([
    call(pingWatcher),
  ]);
}
