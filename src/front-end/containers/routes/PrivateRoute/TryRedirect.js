import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/*
  Assuming props containing:
    history  
    location
    match
 */
const TryRedirect = (props) => {
  const { 
    isAuthenticated, 
    component: Component,
    ...rest
  } = props;

  return (
    isAuthenticated ? (
      <Component {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: rest.location },
      }}/>
    )
  )
};

export default connect(
  state => ({ isAuthenticated: state.get('global').isAuthenticated }),
  {},
)(TryRedirect);
