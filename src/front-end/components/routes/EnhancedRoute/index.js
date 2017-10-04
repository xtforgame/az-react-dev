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

  render(){
    let { match, location, history, staticContext, store, onEnter, onLeave, hocComponent: HocComponent, componentName, component: Component, epic, reducer, ...rest } = this.props;
    HocComponent = HocComponent || ViewHoc;

    let component = Component && ((props) => <HocComponent {...props} store={store} onEnter={onEnter} onLeave={onLeave} componentName={componentName} component={Component} epic={epic} reducer={reducer} />);
    return (
      <Route {...rest} component={component}/>
    );
  }
}

let EnhancedRoute = withRouter(EnhancedRouteInternal);

export default EnhancedRoute;
