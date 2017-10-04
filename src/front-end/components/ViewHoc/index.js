import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import createInjectableEpic from '~/createInjectableEpic';
import { getAsyncInjectors } from '~/utils/injectors';

class ViewHoc extends React.Component {
  constructor(props){
    super(props);
    // console.log('props.match', props.match);
    // console.log('props.location', props.location);
    // console.log('props.history', props.history);
    // console.log('props.staticContext', props.staticContext);
    this.state = {component: null};
  }

  componentWillMount(){
    let onEnter = this.props.onEnter || (() => {});
    let { componentName, store, epic, reducer } = this.props;
    // console.log('store :', store);
    let { injectReducer, injectEpic } = getAsyncInjectors(store);
    if(reducer){
      // console.log('reducer :', reducer);
      injectReducer(componentName, reducer);
    }
    if(epic){
      // console.log('epic :', epic);
      injectEpic(componentName, epic);
    }
    onEnter(this.props);
    this.setState({component: this.props.component});
  }

  componentWillUnmount(){
    let onLeave = this.props.onLeave || (() => {});
    let { componentName, store, epic } = this.props;
    let { removeEpic } = getAsyncInjectors(store);
    removeEpic(componentName);
    onLeave(this.props);
    this.setState({component: this.props.component});
  }

  render(){
    let { match, location, history, staticContext, store, onEnter, onLeave, component, componentName, epic, reducer, ...rest } = this.props;

    let Component = this.state.component;
    if(!Component){
      return null;
    }
    return (<Component {...rest} />);
  }
}

export default withRouter(ViewHoc);
