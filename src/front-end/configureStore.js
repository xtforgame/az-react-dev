import 'rxjs';
import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';

import { createEpicMiddleware } from 'redux-observable';
import createReducer from './createReducer';
import createInjectableEpic from './createInjectableEpic';

const rootInjectable = createInjectableEpic();
const epicMiddleware = createEpicMiddleware(rootInjectable.injectableEpic);

export default function configureStore(initialState = {}, history) {
  const rMiddleware = routerMiddleware(history);
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    applyMiddleware(epicMiddleware, rMiddleware)
  );

  // Extensions
  store.asyncReducers = {}; // Async reducer registry
  store.asyncInjectables = {}; // Async epic registry

  // rootInjectable.remove();
  rootInjectable.inject();

  return store;
}
