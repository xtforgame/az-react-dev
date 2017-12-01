import React from 'react';
import getDisplayName from '~/utils/getDisplayName';
import { getStore } from '~/configureStore';

export default (Component) => class WithStoreHoc extends React.Component {
  static displayName = `withStore(${getDisplayName(Component)})`;

  render(){
    return (<Component {...this.props} store={getStore()} />);
  }
}
