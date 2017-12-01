import React from 'react';
import { Route } from 'react-router';

class EnhancedRoute extends React.Component {
  render(){
    let {
      routeName,
      component: Component,
      routeView,
      routeViews,
      ...rest,
    } = this.props;

    // console.log(`EnhancedRoute render: ${routeName}`);

    return (
      <Route
        {...rest}
        render={(compProps) => (
          <Component
            routeName={routeName}
            routeView={routeView}
            routeViews={routeViews}
            {...compProps}
          />
        )}
      />
    );
  }
}

export default EnhancedRoute;
