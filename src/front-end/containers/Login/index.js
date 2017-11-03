import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import {
  login,
} from '../App/actions';
import {
  Redirect,
} from 'react-router-dom';

let Login = withRouter(({ location, isAuthenticated, login }) => {
  let fromPath = location.state && location.state.from.pathname;
  fromPath && console.log(`Redirected page from ${fromPath} to Login`);
  if(isAuthenticated){
    fromPath = fromPath || '/';
    return (
      <Redirect to={{
        pathname: fromPath,
      }}/>
    );
  }
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
});

export default connect(
  state => ({ isAuthenticated: state.get('global').isAuthenticated }),
  { login }
)(Login);
