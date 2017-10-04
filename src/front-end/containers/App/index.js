import React from 'react';
import { connect } from 'react-redux';
import {
  greet,
} from './actions';
import {
  withRouter,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

let App = withRouter(({ history, greet, greetName }) => (
  <div>
    { greetName }<br />
    <FormattedMessage {...messages.greetText} values={{user: greetName || 'user'}} /><br />
    <button onClick={() => history.push('/about')}>xxxx1</button>
    <button onClick={() => history.push('/home')}>xxxx1</button>
    <button onClick={() => history.push('/ro-test')}>xxxx2</button>
  </div>
));

export default connect(
  state => ({ greetName: state.get('global').greetName }),
  { greet }
)(App);
