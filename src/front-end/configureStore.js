import { routerReducer } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import { Map as ImmutableMap } from 'immutable';

import { configureStore } from 'rrw-module';
import RrwExEpic from 'rrw-module/extensions/epic';

import languageProviderReducer from '~/containers/LanguageProvider/reducer';

import appReducer from '~/containers/App/reducer';
import appEpic from '~/containers/App/epic';

import { middleware as localStorageMiddleware } from './localStorage';

const staticReducers = {
  global: appReducer,
  router: routerReducer,
  language: languageProviderReducer,
};

export default (initialState, history) => configureStore(staticReducers, ImmutableMap(initialState), {
  extensions: [
    {
      extension: RrwExEpic,
      options: {
        staticEpic: appEpic,
      },
    },
  ],
  middlewares: [routerMiddleware(history), localStorageMiddleware],
});
