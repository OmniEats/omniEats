
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from '../Backend/Sidebar';
import Home from './components/Home';
import MainLogin from './components/MainLogin'


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
        <div>
        <NavBar />
        </div>
        <div>
        <Route exact path="/meat" component={MeatBar} />
        <Route exact path="/mixed" component={MixedBar} />
        <Route exact path="/veggie" component={VeggieBar} />
        <Route exact path="/" component={Home} />
        <Route path="/:filter" render={({ match }) => <Home match={match} />} />
        <Route path="/login"component={MainLogin} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
