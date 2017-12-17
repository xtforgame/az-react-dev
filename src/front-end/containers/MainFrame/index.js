import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { push } from 'react-router-redux';
import { messages } from '../App/translation';

class MainFrame extends React.Component {
  componentWillMount(){
    console.log('MainFrame componentWillMount');
  }

  render(){
    let { routeView, push } = this.props;
    return (
      <div>
        {routeView}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({}),
    { push }
  ),
  injectIntl,
)(MainFrame);
