import React from 'react';
import './App.css';
import Main from './Main.js';
import PageFooter from './PageFooter.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './login_signup/Signup.js';
import Login from './login_signup/Login.js';
import MapContainer from './map/Map.js';
import Home from "./Home";
import Game from "./Games/Game";
import Profile from "./Profile";
import Quiz from "./Games/Quiz";
function App() {
  return (
    <Router>
    <div className="App">
      <Main />
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/game" component={Game}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/quiz" component={Quiz}/>
        <Route path = "/map" component = {MapContainer}/>
        <Route path = "/login" component = {Login}/>
        <Route path = "/signup" component = {SignUp}/>
        <PageFooter />
    </div>
    </Router>
  );
}

export default App;
