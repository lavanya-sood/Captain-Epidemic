import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Profile from "./Profile";


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>The Adventures of Captain Epidemic</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/game">Game</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Game" component={Game}/>
            <Route path="/Profile" component={Profile}/>

          </div>
        </div>
      </HashRouter>
    );
  }
}
export default Main;
