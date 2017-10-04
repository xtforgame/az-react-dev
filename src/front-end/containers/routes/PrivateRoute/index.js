import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Route from '~/components/routes/EnhancedRoute';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

export default connect(
  state => ({ isAuthenticated: state.get('global').isAuthenticated }),
  {}
)(PrivateRoute);
