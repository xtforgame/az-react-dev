import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Redirect,
} from 'react-router-dom';
import {
  login,
} from '../App/actions';

const Login = withRouter(({ location, isAuthenticated, login }) => {
  let fromPath = location.state && location.state.from.pathname;
  if (fromPath) {
    // console.log(`Redirected page from ${fromPath} to Login`);
  }
  if (isAuthenticated) {
    fromPath = fromPath || '/';
    return (
      <Redirect to={{
        pathname: fromPath,
      }}
      />
    );
  }
  return (
    <div>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  );
});

export default connect(
  state => ({ isAuthenticated: state.get('global').isAuthenticated }),
  { login }
)(Login);
