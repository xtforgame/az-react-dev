import React from 'react';
import EnhancedRoute from '~/components/routes/EnhancedRoute';
import TryRedirect from './TryRedirect';

class PrivateRoute extends React.PureComponent {
  render() {
    const { component, ...rest } = this.props;

    return (
      <EnhancedRoute
        {...rest}
        component={TryRedirect}
        componentProps={{ component }}
      />
    );
  }
}

export default PrivateRoute;
