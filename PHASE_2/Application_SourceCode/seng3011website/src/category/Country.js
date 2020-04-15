import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import aus from "../img/aus.png";
import china from "../img/china1.png";
import usa from "../img/usa.png";
import "../css/pure-min.css";
import "../css/SearchResult.css";

class Country extends Component {
  render() {
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
        <Link to="location" className="result-link">
          <div className="result">
            <img src={aus} className="result-img"></img>
            <h3 className="result-content">Australia</h3>
          </div>
        </Link>
        <Link to="location" className="result-link">
          <div className="result">
            <img src={china} className="result-img"></img>
            <h3 className="result-content">China</h3>
          </div>
        </Link>
        <Link to="location" className="result-link">
          <div className="result">
            <img src={usa} className="result-img"></img>
            <h3 className="result-content">America</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default mainLayout(Country);
