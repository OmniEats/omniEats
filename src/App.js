import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/:filter" render={({ match }) => <Home match={match} />} />
      </Router>
    );
  }
}

export default App;
