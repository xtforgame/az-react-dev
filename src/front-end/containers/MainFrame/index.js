import React from 'react';

export default class MainFrame extends React.Component {
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
