
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MainLogin from './components/MainLogin';

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route path="/" component={Home} />
        <Route path="/login"component={MainLogin} />
      </Router>
    );
  }
}

export default App;
