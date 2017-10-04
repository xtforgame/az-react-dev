import React from 'react';
class AsyncPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {Component: null};
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({Component: (<div>xxxxxxxxxxxx</div>)});
    }, 2000);
  }
  render(){
    return this.state.Component;
  }
}

export default AsyncPage;
