import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'; // new: temporary tap-event codes

import configureStore from './configureStore';
import getRoutes from './getRoutes';

import LanguageProvider from '~/containers/LanguageProvider';
import { translationMessages } from './i18n';

injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const initialState = {};
const store = configureStore(initialState, history);


const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          {getRoutes(store)}
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    document.getElementById('page_main')
  );
};

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/de.js');
  require('intl/locale-data/jsonp/zh.js');
  render(translationMessages);
} else {
  render(translationMessages);
}
