import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  logout,
} from '../App/actions';

const Home = ({ intl, greetName, logout, t }) => (
  <div>
    {t('greetText', { user: greetName || 'user0001' })}
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
  withTranslation(['app-common']),
)(Home);
