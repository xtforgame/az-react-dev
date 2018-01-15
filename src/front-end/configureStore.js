import { routerReducer } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';

import { configureStore } from 'rrw-module';
import RrwExSaga from 'rrw-module/extensions/saga';

import languageProviderReducer from '~/containers/LanguageProvider/reducer';

import appReducer from '~/containers/App/reducer';
import appSaga from '~/containers/App/saga';

const staticReducers = {
  global: appReducer,
  router: routerReducer,
  language: languageProviderReducer,
};

export default (initialState, history) => configureStore(staticReducers, fromJS(initialState), {
  extensions: [
    {
      extension: RrwExSaga,
      options: {
        staticSaga: appSaga,
      },
    },
  ],
  middlewares: [routerMiddleware(history)],
});
