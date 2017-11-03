import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { combineEpics } from 'redux-observable';
import makeEpicInjectable from '~/utils/makeEpicInjectable';
import createReducer from '~/createReducer';
import createInjectableEpic from '~/createInjectableEpic';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    asyncReducers: isObject,
    asyncInjectables: isObject,
  };
  if(!conformsTo(store, shape)){
    throw new Error('(app/utils...) asyncInjectors: Expected a valid redux store');
  }
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    if(!isString(name) || isEmpty(name) || !isFunction(asyncReducer)){
      throw new Error('(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function');
    }

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded epic
 */
export function injectAsyncEpics(store, isValid) {
  return {
    injectEpic: (name, _epic) => {
      let epic = _epic;
      if (!isValid) checkStore(store);

      if(Array.isArray(epic)){
        epic = combineEpics(..._epic);
      }

      // // I think we don't really need to explicit remove the origin one
      // let originInjectable = store.asyncInjectables[name];
      // if(originInjectable){
      //   originInjectable.remove();
      // }

      const injectable = makeEpicInjectable(epic);
      store.asyncInjectables[name] = injectable; // eslint-disable-line no-param-reassign
      createInjectableEpic(Object.keys(store.asyncInjectables).map(key => store.asyncInjectables[key].injectableEpic));
      injectable.inject();
      return injectable;
    },
    getInjectableEpic: (name) => {
      return store.asyncInjectables[name];
    },
    removeEpic: (name, onlySpecificInjectable) => {
      const injectable = store.asyncInjectables[name];
      if(injectable){
        if(!onlySpecificInjectable || onlySpecificInjectable === injectable){
          injectable.remove();
        }
      }
      return injectable;
    }
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    ...injectAsyncEpics(store, true),
  };
}
