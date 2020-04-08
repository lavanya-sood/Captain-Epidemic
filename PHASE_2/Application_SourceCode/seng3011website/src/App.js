import React from "react";
import "./App.css";
import Landing from "./Landing.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./login_signup/Signup.js";
import Login from "./login_signup/Login.js";
import MapContainer from "./map/Map.js";
import Home from "./Home";
import Game from "./Games/Game";
import Profile from "./Profile";
import Quiz from "./Games/Quiz";
import Info from "./Info";
import SearchResult from "./category/SearchResult";
import Country from "./category/Country";
import Disease from "./category/Disease";
import Location from "./Location";
import Hangman from "./Games/Hangman"

function App() {
  return (
    <Router>
    <div className="App">
          <Route exact path="/" component={Landing}/>
          <Route path="/home" component={Home}/>
          <Route path="/game" component={Game}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/info" component={Info}/>
          <Route path="/quiz" component={Quiz}/>
          <Route path = "/map" component = {MapContainer}/>
          <Route path = "/login" component = {Login}/>
          <Route path = "/signup" component = {SignUp}/>
          <Route path="/searchResult" component={SearchResult} />
          <Route path="/country" component={Country} />
          <Route path="/disease" component={Disease} />
          <Route path="/location" component={Location} />
          <Route path="/hangman" component={Hangman} />

    </div>
    </Router>
  );
}

export default App;
