import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import {
  greet,
} from './actions';
import {
  withRouter,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import formatMessage from '~/utils/formatMessage';
import { messages } from './translation';
import { ConnectedRouter } from 'react-router-redux';
import { changeLocale } from '~/containers/LanguageProvider/actions';
import { makeSelectLocale } from '~/containers/LanguageProvider/selectors';


let App = ({ history, pathname, routes, locale, intl, changeLocale, greetName }) => (
  <div>
    <select name={'lang'} value={locale} onChange={changeLocale} style={{float: 'right'}}>
      <option value="de">de</option>
      <option value="en">en</option>
      <option value="ja">ja</option>
      <option value="zh-CN">zh-CN</option>
      <option value="zh-TW">zh-TW</option>
    </select>
    {formatMessage(intl, messages.greetText, {user: greetName || 'user0001'})}<br />
    <FormattedMessage {...messages.greetText} values={{user: greetName || 'user'}} /><br /><br />
    {(pathname === '/async') && ' >>> ' }<button onClick={() => history.push('/async')}>Async Page</button><br />
    {(pathname === '/injector-test') && ' >>> ' }<button onClick={() => history.push('/injector-test')}>Injector Test (Login is required)</button><br />
    {(pathname === '/home') && ' >>> ' }<button onClick={() => history.push('/home')}>Home Page (in Main Frame)</button><br />
    {(pathname === '/async-in-main') && ' >>> ' }<button onClick={() => history.push('/async-in-main')}>Async Page (in Main Frame)</button><br />
    <hr />
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </div>
);

const mapStateToProps = createSelector(
  makeSelectLocale(),
  state => state.get('global').greetName,
  state => state.get('router').location && state.get('router').location.pathname,
  (locale, greetName, pathname) => ({ locale, greetName, pathname })
);

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: (event) => dispatch(changeLocale(event.target.value)),
    dispatch,
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
)(App);
