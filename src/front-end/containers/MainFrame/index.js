import React from 'react';

export default class MainFrame extends React.PureComponent {
  componentWillMount() {
    // console.log('MainFrame componentWillMount');
  }

  render() {
    const { routeView } = this.props;
    return (
      <div>
        {routeView}
      </div>
    );
  }
}
