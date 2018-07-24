import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllData from './pages/AllData';
import Local from './pages/Local';
import Test from './pages/Test';


export default class App extends React.Component {
  constructor(props) {
    super(props);

        
  }

  render() {
    console.log("App render");

    const renderAllData = ({history, match}) => {
      return <AllData history={history} /> ;
    }
    const renderLocal = ({history, match}) => {
      return <Local history={history} /> ;
    }    

    const renderTest = ({history, match}) => {
      return <Test history={history} /> ;
    }    

    return (
      <div>
        <Switch>{/* Switch는 첫번째 매칭되는 결과를 렌더링 */}
          <Route path="/alldata" render={renderAllData} />
          <Route path="/local" render={renderLocal} />
          <Route path="/test" render={renderTest} />
          <Route path="/" render={renderLocal} />
        </Switch>
      </div>
    );
  }
}
