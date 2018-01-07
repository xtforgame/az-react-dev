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
      routeView,
      routeViews,
      component: RenderComponent,
      componentProps,
      ...rest,
    } = this.props;


    return (
      <Route
        {...rest}
        render={(p) => (
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
