import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import "../css/pure-min.css";
import "../css/SearchResult.css";

class Result extends Component {
  render() {
    return (
      <div className="result-div">
        <div className="header-div" width="100%">
          <img
            src={logo}
            className="logo-img"
            alt="Logo"
            width="110"
            height="100"
          />
          <h3 className="header-name">Search Result</h3>
        </div>

        <div className="result">
          <h3>hello world testing</h3>
        </div>
        <div className="result">
          <h3>hello world testing2</h3>
        </div>
        <div className="result">
          <h3>hello world testing3</h3>
        </div>
      </div>
    );
  }
}

export default mainLayout(Result);
