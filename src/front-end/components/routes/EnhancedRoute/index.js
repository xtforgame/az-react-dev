import React from 'react';
import { Route } from 'react-router';

class EnhancedRoute extends React.Component {
  render() {
    const {
      routeName,
      routeView,
      routeViews,
      component: RenderComponent,
      componentProps,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={p => (
          <RenderComponent
            {...p}
            routeName={routeName}
            routeView={routeView}
            routeViews={routeViews}
            {...componentProps}
          />
        )}
      />
    );
  }
}

export default EnhancedRoute;
