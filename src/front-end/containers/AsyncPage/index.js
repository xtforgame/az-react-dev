import React from 'react';

class AsyncPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: (
        <div>
          Please wait for loading...
        </div>
      ),
    };
    this.deferredLoad = null;
  }

  componentDidMount() {
    this.deferredLoad = setTimeout(() => {
      this.setState({
        Component: (
          <div>
            Deferred Loaded Component
          </div>
        ),
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.deferredLoad);
  }

  render() {
    const { Component } = this.state;
    return Component;
  }
}

export default AsyncPage;
