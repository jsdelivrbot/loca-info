import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res : ""
    }

  
    fetch("/allData")
      .then(res => res.json())
      .then(json => {
        this.setState({
          res: json
        }
      )
    })
        
  }

  render() {
    console.log("App render");

  
    return (
      <div>
        <div>allData is..</div>
        <pre>{JSON.stringify(this.state.res, null,2)}</pre>
      </div>
    );
  }
}
