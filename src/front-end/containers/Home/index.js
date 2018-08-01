import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import formatMessage from '~/utils/formatMessage';
import {
  logout,
} from '../App/actions';
import { messages } from '../App/translation';

const Home = ({ intl, greetName, logout }) => (
  <div>
    {formatMessage(intl, messages.greetText, { user: greetName || 'user0001' })}
    <br />
    <button type="button" onClick={logout}>
Logout
    </button>
  </div>
);

export default compose(
  connect(
    state => ({
      greetName: state.get('global').greetName,
    }),
    { logout }
  ),
  injectIntl,
)(Home);
