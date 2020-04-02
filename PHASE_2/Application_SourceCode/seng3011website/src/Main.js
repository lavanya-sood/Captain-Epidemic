import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Profile from "./Profile";
import MapContainer from "./Map.js";

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>The Adventures of Captain Epidemic</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/map">Map</NavLink></li>
            <li><NavLink to="/game">Game</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Game" component={Game}/>
            <Route path="/Profile" component={Profile}/>
            <Route path="/Map" component={MapContainer}/>
          </div>
        </div>
      </Router>
    );
  }
}
export default Main;
