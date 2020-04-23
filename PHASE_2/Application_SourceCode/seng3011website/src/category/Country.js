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
  state = {
    countries: "",
  };
  callLocationAPI() {
    fetch("/map/countries")
      .then((res) => res.json())
      .then((res) => this.setState({ countries: res }));
  }
  listLocations = () => {
    let container = [];
    for (let i = 0; i < this.state.countries.length; i++) {
      container.push(
        <Link to="location/{this.state.countries[i]}" className="result-link">
          <div className="result">
            {/* <img src={aus} className="result-img"></img> */}
            <h3 className="result-content">{this.state.countries[i]} </h3>
          </div>
        </Link>
      );
    }
    return container;
  };
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
        <div> {this.listLocations()} </div>
      </div>
    );
  }
}

export default mainLayout(Country);
