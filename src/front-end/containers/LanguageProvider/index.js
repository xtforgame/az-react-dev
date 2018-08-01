/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      locale,
      messages,
      children,
    } = this.props;
    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({ locale }),
);

export default connect(mapStateToProps)(LanguageProvider);
