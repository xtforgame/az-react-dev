import React from 'react';
import { Route } from 'react-router';
import {
  withRouter,
} from 'react-router-dom';
import ViewHoc from '~/components/ViewHoc';

class EnhancedRouteInternal extends React.Component {
  constructor(props){
    super(props);
    // console.log('props.match', props.match);
    // console.log('props.location', props.location);
    // console.log('props.history', props.history);
    // console.log('props.staticContext', props.staticContext);
  }

  // componentWillMount(){
  //   console.log('EnhancedRoute componentWillMount');
  // }

  render(){
    let {
      routeName,
      match,
      location,
      history,
      staticContext,
      store,
      onEnter,
      onEntered,
      onLeave,
      hocComponent: HocComponent,
      componentName,
      component,
      routeView,
      routeViews,
      epic,
      reducer,
      ...rest,
    } = this.props;
    HocComponent = HocComponent || ViewHoc;

    // console.log(`EnhancedRouteInternal render: ${routeName}`);

    return (
      <Route
        {...rest}
        render={(compProps) => (
          <HocComponent
            routeName={routeName}
            routeView={routeView}
            routeViews={routeViews}
            {...compProps}
            store={store}
            onEnter={onEnter}
            onEntered={onEntered}
            onLeave={onLeave}
            componentName={componentName}
            component={component}
            epic={epic}
            reducer={reducer}
          />
        )}
      />
    );
  }
}

let EnhancedRoute = withRouter(EnhancedRouteInternal);

export default EnhancedRoute;
