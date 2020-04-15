import React, { Component } from "react";
import { Link} from "react-router-dom";
import logo from '../img/virus.png';
import mainLayout from '../MainLayout.js';
class Game extends Component {

  //return state
  render() {
    return (
      <div>
        <h2>The Virus Game</h2>
        <p>{this.state.users}</p>
        <div>
        <img src={logo} alt="Logo" width="110" height="100" />
        </div>
        <div className = "divSpacing">
         <Link to="/Quiz" className="btn btn-primary">Play Now</Link>

       </div>
      </div>
    );
  }
}

export default mainLayout(Game);
