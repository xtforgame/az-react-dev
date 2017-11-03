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
    // console.log('VOC componentWillMount');
    let onEnter = this.props.onEnter || (() => {});
    let { componentName, store, epic, reducer } = this.props;
    // console.log('store :', store);
    let { injectReducer, injectEpic, getInjectableEpic } = getAsyncInjectors(store);
    if(reducer){
      // console.log('reducer :', reducer);
      injectReducer(componentName, reducer);
    }
    if(epic){
      // console.log('epic :', epic);
      this.injectableEpic = injectEpic(componentName, epic);
    }
    onEnter(this.props);
    this.setState({component: this.props.component});
  }

  componentDidMount(){
    let onEntered = this.props.onEntered || (() => {});
    let { componentName, store, epic, reducer } = this.props;
    // console.log('store :', store);
    let { injectReducer, injectEpic, getInjectableEpic } = getAsyncInjectors(store);
    if(reducer){
      // console.log('reducer :', reducer);
      injectReducer(componentName, reducer);
    }
    if(epic){
      // console.log('epic :', epic);
      this.injectableEpic = injectEpic(componentName, epic);
    }
    onEntered(this.props);
    this.setState({component: this.props.component});
  }

  componentWillUnmount(){
    let onLeave = this.props.onLeave || (() => {});
    let { componentName, store, epic } = this.props;
    let { removeEpic, getInjectableEpic } = getAsyncInjectors(store);
    removeEpic(componentName, this.injectableEpic);
    onLeave(this.props);
    this.setState({component: this.props.component});
  }

  render(){
    let { routeName, store, onEnter, onEntered, onLeave, component, componentName, epic, reducer, ...rest } = this.props;

    // console.log(`Hoc render: ${routeName}`);

    let Component = this.state.component;
    if(!Component){
      return null;
    }
    return (<Component {...rest} />);
  }
}

export default withRouter(ViewHoc);
