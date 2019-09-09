import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/:filter" render={({ match }) => <Home match={match} />} />
      </Router>
    );
  }
}

export default App;
