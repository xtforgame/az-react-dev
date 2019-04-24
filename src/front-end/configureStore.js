/* eslint-disable no-underscore-dangle, no-param-reassign, no-return-assign */
import { compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { Map as ImmutableMap } from 'immutable';

import { configureStore } from 'rrw-module';
import RrwExEpic from 'rrw-module/extensions/epic';
import createReduxWaitForMiddleware from 'redux-wait-for-action';

import languageProviderReducer from '~/containers/LanguageProvider/reducer';

import {
  LOGOUT,
} from '~/containers/App/constants';
import appReducer from '~/containers/App/reducer';
import appEpic from '~/containers/App/epic';

import { middleware as localStorageMiddleware } from './localStorage';

const staticReducers = {
  global: appReducer,
  router: routerReducer,
  language: languageProviderReducer,
};

let composeEnhancers;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

let store = null;

export const getStore = () => store;

export default (initialState, history) => store = configureStore(staticReducers, ImmutableMap(initialState), {
  reducerOptions: {
    createRootReducer: (rootReducer => (state, action) => {
      if (action.type === LOGOUT) {
        // leave keys belong to staticReducers after logout
        state = state.filter((v, k) => staticReducers[k] !== undefined);
      }

      return rootReducer(state, action);
    }),
  },
  extensions: [
    {
      extension: RrwExEpic,
      options: {
        staticEpic: appEpic,
      },
    },
  ],
  middlewares: [routerMiddleware(history), localStorageMiddleware, createReduxWaitForMiddleware()],
  compose: composeEnhancers,
});
