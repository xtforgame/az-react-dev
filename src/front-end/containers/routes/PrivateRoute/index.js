import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Route from '~/components/routes/EnhancedRoute';

let addRedirector = (Component) => withRouter(({ isAuthenticated, ...rest }) => {
  return (
    isAuthenticated ? (
      <Component {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: rest.location }
      }}/>
    )
  )
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={
      connect(
        state => ({ isAuthenticated: state.get('global').isAuthenticated }),
        {}
      )(addRedirector(Component))
    }
  />
);

export default PrivateRoute;
