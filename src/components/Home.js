import React from "react";
import MapDisplay from "./MapDisplay";
import SideBar from "./SideBar";
import MeatBar from './MeatBar';
import MixedBar from './MixedBar';
import VeggieBar from './VeggieBar';
import { HashRouter as Router, Route } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <Router>
        <Route exact path="/meat" component={MeatBar} />
        <Route exact path="/mixed" component={MixedBar} />
        <Route exact path="/veggie" component={VeggieBar} />
      </Router>
      <MapDisplay />
    </div>
  )
}
