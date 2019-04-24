/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';

import configureStore from './configureStore';
import getRoutes from './getRoutes';
import fontLoader from './fontLoader';
import { loadState } from './localStorage';

import App from '~/containers/App';
import { i18nextInited } from './i18next';
import './main.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHashHistory();

const initialState = {
  ...loadState(),
};
// console.log('initialState :', initialState);
const store = configureStore(initialState, history);

class AppWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      app: (
        <div id="loading-page" style={{ fontFamily: '' }}>
          Loading Page
        </div>
      ), // the loading page
    };
  }

  componentDidMount() {
    fontLoader().min
    .then(() => {
      this.setState({
        app: <App history={history} routes={getRoutes()} />,
      });
    });
  }

  render() {
    const { app } = this.state;
    return (
      <Provider store={store}>
        {app}
      </Provider>
    );
  }
}

i18nextInited.then(() => {
  ReactDOM.render(
    <AppWrapper />,
    document.getElementById('page_main')
  );
});
