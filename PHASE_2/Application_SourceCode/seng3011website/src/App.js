import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './Main.js';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapContainer from "./Map.js";

function App() {
  return (
    <Router>
    <div className="App">
      <Main />
    </div>
    <Switch>
      <Route exact path='/map' component={MapContainer} />
    </Switch>
    </Router>
  );
}

export default App;
