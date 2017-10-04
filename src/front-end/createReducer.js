import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';

import globalReducer from '~/containers/App/reducer';
import languageProviderReducer from '~/containers/LanguageProvider/reducer';

export default function createReducer(asyncReducers) {
  // console.log('asyncReducers :', asyncReducers);
  return combineReducers({
    global: globalReducer,
    router: routerReducer,
    language: languageProviderReducer,
    ...asyncReducers,
  });
}
