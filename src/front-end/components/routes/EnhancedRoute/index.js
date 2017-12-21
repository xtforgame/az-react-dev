import React from 'react';
import { Route } from 'react-router';

class EnhancedRoute extends React.Component {
  constructor(props){
    super(props);
    this.state = {component: null};
  }

  componentWillMount(){
    // [TODO] Maybe the route should be rename to something like `FixedRoute`
    //        to remind the user that the route dosen't support component changing
    // It makes `component` unable to get updated from props
    // for avoiding unexpected unmount and mount
    this.setState({component: this.props.component});
  }

  render(){
    let {
      routeName,
      component,
      routeView,
      routeViews,
      ...rest,
    } = this.props;

    // console.log(`EnhancedRoute render: ${routeName}`);

    let Component = this.state.component;

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
