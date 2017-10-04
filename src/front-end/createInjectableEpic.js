import { combineEpics } from 'redux-observable';
import appEpic from '~/containers/App/epic';
import makeEpicInjectable from '~/utils/makeEpicInjectable';

const rootInjectable = makeEpicInjectable(appEpic);

export default function createInjectableEpic(asyncInjectables = []) {
  rootInjectable.inject(combineEpics(appEpic, ...asyncInjectables));
  return rootInjectable;
}
