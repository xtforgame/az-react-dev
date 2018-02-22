import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin'; // new: temporary tap-event codes

import configureStore from './configureStore';
import getRoutes from './getRoutes';
import fontLoader from './fontLoader';
import { loadState } from './localStorage';

import LanguageProvider from '~/containers/LanguageProvider';
import { getTranslationMessages } from './i18n';
import App from '~/containers/App';
import './main.css';

injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const initialState = {
  ...loadState(),
};
// console.log('initialState :', initialState);
const store = configureStore(initialState, history);

class AppWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      app: <div id="loading-page" style={{fontFamily: ''}}>Loading Page</div>, // the loading page
    };
  }

  componentWillMount(){
    fontLoader().min
    .then(() => {
      this.setState({
        app: <App history={history} routes={getRoutes()} />,
      });
    });
  }

  render(){
    return (
      <Provider store={store}>
        <LanguageProvider messages={this.props.messages}>
          {this.state.app}
        </LanguageProvider>
      </Provider>
    );
  }
}

const render = (messages) => {
  ReactDOM.render(
    <AppWrapper messages={messages} />,
    document.getElementById('page_main')
  );
};

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/de.js');
  require('intl/locale-data/jsonp/zh.js');
  render(getTranslationMessages());
} else {
  render(getTranslationMessages());
}
