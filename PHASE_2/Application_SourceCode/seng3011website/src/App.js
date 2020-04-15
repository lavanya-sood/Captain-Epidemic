import React from "react";
import "./App.css";
import Landing from "./Landing.js";
import { HashRouter as Router, Route } from "react-router-dom";
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
import axios from 'axios';
import Hangman from "./Games/Hangman"
// updates map db daily to get current data from calmclams
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 * * *', function() {
  axios.post('/map')
}, null, true, 'Australia/Sydney');
job.start();

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
          <Route path="/login"
          render={(props)=>{
                if(localStorage.getItem('username')) return <Home/>;
                else return <Login/>;
            }} />
          <Route path = "/signup"
          render={(props)=>{
              if(localStorage.getItem('username')) return <Home/>;
              else return <SignUp/>;
          }} />
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
