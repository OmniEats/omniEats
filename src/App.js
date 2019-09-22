
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MainLogin from './components/MainLogin';
import Restaurants from './components/Restaurants';
import { connect } from 'react-redux';
import { loginUser } from './store'

class App extends React.Component {

  componentDidMount() {
    this.props.loadSession()
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={MainLogin} />
        <Route path="/restaurants" component={Restaurants} />
      </Router>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
  loadSession: () => dispatch(loginUser())
  }
}

export default connect(null, dispatchToProps)(App);
