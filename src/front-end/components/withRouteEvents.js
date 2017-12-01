import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import getDisplayName from '~/utils/getDisplayName';

export default (events) => (Component) => withRouter(class WithRouteEventsHoc extends React.Component {
  static displayName = `withRouteEvents(${getDisplayName(Component)})`;

  componentWillMount(){
    // console.log('VOC componentWillMount');
    let onEnter = events.onEnter || (() => {});
    onEnter(this.props);
    this.setState({component: events.component});
  }

  componentDidMount(){
    let onEntered = events.onEntered || (() => {});
    onEntered(this.props);
  }

  componentWillUnmount(){
    let onLeave = events.onLeave || (() => {});
    onLeave(this.props);
    this.setState({component: events.component});
  }

  render(){
    // console.log(`Hoc render: ${routeName}`);
    return Component && (<Component {...events} />);
  }
});
