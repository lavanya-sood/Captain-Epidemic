import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";

import "../css/pure-min.css";
import "../css/SearchResult.css";

class Disease extends Component {
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
          <h1 className="header-name">Diseases</h1>
        </div>
        <Link to="info" className="result-link">
          <div className="result">
            <h3 className="result-content">CORONAVIRUS</h3>
          </div>
        </Link>
        <Link to="info" className="result-link">
          <div className="result">
            <h3 className="result-content">EBOLA</h3>
          </div>
        </Link>
        <Link to="info" className="result-link">
          <div
            className="result"
            // background-image="url('../img/titlecard.jpg')"
          >
            <h3 className="result-content">YELLOW FEVER</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default mainLayout(Disease);
