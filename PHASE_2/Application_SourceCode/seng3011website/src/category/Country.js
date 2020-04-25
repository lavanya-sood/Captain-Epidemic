import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import aus from "../img/aus.png";
import china from "../img/china1.png";
import usa from "../img/usa.png";
import germany from "../img/germany.png";
import italy from "../img/italy.png";
import uk from "../img/uk.png";
import "../css/pure-min.css";
import "../css/SearchResult.css";
import { locations } from "./LocationData";

class Country extends Component {
  render() {
    let container = [];
    for (let i = 0; i < locations.length; i++) {
      const link = "location/" + locations[i];
      container.push(
        <Link to={link} className="result-link">
          <div className="result">
            {/* <img src={aus} className="result-img"></img> */}
            <h3 className="result-content"> {locations[i]} </h3>
          </div>
        </Link>
      );
    }

    return (
      <div className="result-div">
        <div className="header-div">
          <img
            src={logo}
            className="logo-img"
            alt="Logo"
            width="110"
            height="100"
          />
          <h2 className="header-name">Locations</h2>
        </div>
        <div> {container} </div>
      </div>
    );
  }
}

export default mainLayout(Country);
