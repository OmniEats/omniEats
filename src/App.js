import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
        <div>
        <NavBar />
        </div>
        <div>
        <Route exact path="/" component={Home} />
        <Route path="/:filter" render={({ match }) => <Home match={match} />} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
