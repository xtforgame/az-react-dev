import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  rememberMe,
} from './actions';
import formatMessage from '~/utils/formatMessage';
import { messages } from './translation';
import { ConnectedRouter } from 'react-router-redux';
import { changeLocale } from '~/containers/LanguageProvider/actions';
import { makeSelectLocale } from '~/containers/LanguageProvider/selectors';


const App = ({
  history, pathname, routes, locale, intl, changeLocale, greetName, rememberMe, rememberUser,
}) => (
  <div>
    <select name="lang" value={locale} onChange={changeLocale} style={{ float: 'right' }}>
      <option value="de">
        de
      </option>
      <option value="en">
        en
      </option>
      <option value="ja">
        ja
      </option>
      <option value="zh-CN">
        zh-CN
      </option>
      <option value="zh-TW">
        zh-TW
      </option>
    </select>
    {formatMessage(intl, messages.greetText, { user: greetName || 'user0001' })}
    <br />
    <FormattedMessage {...messages.greetText} values={{ user: greetName || 'user' }} />
    <br />
    <br />
    {(pathname === '/async') && ' >>> ' }
    <button type="button" onClick={() => history.push('/async')}>
      Async Page
    </button>
    <br />
    {(pathname === '/injector-test') && ' >>> ' }
    <button type="button" onClick={() => history.push('/injector-test')}>
      Injector Test (Login is required)
    </button>
    <br />
    {(pathname === '/home') && ' >>> ' }
    <button type="button" onClick={() => history.push('/home')}>
      Home Page (in Main Frame)
    </button>
    <br />
    {(pathname === '/async-in-main') && ' >>> ' }
    <button type="button" onClick={() => history.push('/async-in-main')}>
      Async Page (in Main Frame)
    </button>
    <br />
    {(pathname === '/async-in-main2') && ' >>> ' }
    <button type="button" onClick={() => history.push('/async-in-main2')}>
      Async Page (in Main Frame)
    </button>
    <br />
    <hr />
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
    <input type="checkbox" defaultChecked={rememberUser} value={rememberUser} onChange={() => rememberMe(!rememberUser)} />
    {' '}
    Remember Me
  </div>
);

const mapStateToProps = createSelector(
  makeSelectLocale(),
  state => state.get('global').greetName,
  state => state.get('global').rememberUser,
  state => state.get('router').location && state.get('router').location.pathname,
  (locale, greetName, rememberUser, pathname) => ({
    locale, greetName, rememberUser, pathname,
  })
);

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: event => dispatch(changeLocale(event.target.value)),
    rememberMe: rememberUser => dispatch(rememberMe(rememberUser)),
    dispatch,
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
)(App);
