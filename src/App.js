import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import MeatBar from "./components/MeatBar";
import MixedBar from "./components/MixedBar";
import VeggieBar from "./components/VeggieBar";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path="/meat" component={MeatBar} />
        <Route exact path="/mixed" component={MixedBar} />
        <Route exact path="/veggie" component={VeggieBar} />
        <Route exact path="/" component={Home} />
        <Route path="/:filter" render={({ match }) => <Home match={match} />} />
      </Router>
    );
  }
}

export default App;
