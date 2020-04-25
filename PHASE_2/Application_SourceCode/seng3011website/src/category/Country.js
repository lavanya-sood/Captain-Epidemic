import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import aus from "../img/aus.png";
import china from "../img/china1.png";
import usa from "../img/usa.png";
import germany from "../img/germany.png";
import italy from "../img/italy.png";
import "../css/pure-min.css";
import "../css/SearchResult.css";

class Country extends Component {
  state = {
    countries: "",
  };
  callLocationAPI() {
    fetch("/location/countries")
      .then((res) => res.json())
      .then((res) => this.setState({ countries: res }));
  }
  // listLocations = () => {
  //   let container = [];
  //   for (let i = 0; i < this.state.countries.length; i++) {
  //     container.push(

  //     );
  //   }
  //   return container;
  // };
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
        {/* <div> {this.listLocations()} </div> */}
        <Link to="location/Australia" className="result-link">
          <div className="result">
            <img src={aus} className="result-img"></img>
            <h3 className="result-content">Australia</h3>
          </div>
        </Link>
        <Link to="location/China" className="result-link">
          <div className="result">
            <img src={china} className="result-img"></img>
            <h3 className="result-content">China</h3>
          </div>
        </Link>
        <Link to="location/America" className="result-link">
          <div className="result">
            <img src={usa} className="result-img"></img>
            <h3 className="result-content">USA</h3>
          </div>
        </Link>
        <Link to="location/Germany" className="result-link">
          <div className="result">
            <img src={germany} className="result-img"></img>
            <h3 className="result-content">Germany</h3>
          </div>
        </Link>
        <Link to="location/Italy" className="result-link">
          <div className="result">
            <img src={italy} className="result-img"></img>
            <h3 className="result-content">Italy</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default mainLayout(Country);
