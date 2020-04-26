import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import "../css/pure-min.css";
import "../css/SearchResult.css";
import { diseases } from "./DiseaseData";
import { locations } from "./LocationData";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseResult: [],
      locationResult: [],
    };
  }
  emptyResult() {
    this.setState({ diseaseResult: [] });
    this.setState({ locationResult: [] });
  }
  toTitleCase(str) {
       return str.replace(
           /\w\S*/g,
           function(txt) {
               return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
           }
       );
   }
  render() {
    const url = window.location.href;
    var res = url.split("/");
    var searchTerm = "";
    if (res.length > 1 && res[res.length - 1] != "searchResult") {
      searchTerm = res[res.length - 1];
    }

    for (var i = 0; i < diseases.length; i++) {
      if (diseases[i].title) {
        if (
          diseases[i].title.toLowerCase().indexOf(searchTerm) != -1
        ) {
          this.state.diseaseResult.push(diseases[i].title);
        }
      } else if (diseases[i].name.toLowerCase().indexOf(searchTerm) != -1) {
        this.state.diseaseResult.push(diseases[i].name);
      }
    }
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].toLowerCase().indexOf(searchTerm) != -1) {
        this.state.locationResult.push(locations[i]);
      }
    }

    let container = [];
    for (let i = 0; i < this.state.diseaseResult.length; i++) {
      const link = "/info/" + this.toTitleCase(this.state.diseaseResult[i]);
      container.push(
        <Link to={link} className="result-link">
          <div className="result">
            <h3 className="result-content"> {this.state.diseaseResult[i]} </h3>
          </div>
        </Link>
      );
    }
    for (let i = 0; i < this.state.locationResult.length; i++) {
      const link = "/location/" + this.state.locationResult[i];
      container.push(
        <Link to={link} className="result-link">
          <div className="result-locations1">
            <h3 className="result-content"> {this.state.locationResult[i]} </h3>
          </div>
        </Link>
      );
    }
    if (searchTerm === "" || !container.length)
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
            <h2 className="header-name">Search Result</h2>
          </div>
          <div>
            <h2> Result not found</h2>
          </div>
        </div>
      );
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
          <h2 className="header-name">Search Result</h2>
        </div>
        <div> {container} </div>
      </div>
    );
  }
}

export default mainLayout(SearchResult);
