import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import { diseases } from "./DiseaseData";
import "../css/pure-min.css";
import "../css/SearchResult.css";

class Disease extends Component {
  sortDiseases = () => {
    return diseases.sort(function (a, b) {
      var nameA = a.name,
        nameB = b.name;
      if (a.title) nameA = a.title;
      if (b.title) nameB = b.title;
      return nameA.localeCompare(nameB);
    });
  };

  toTitleCase(str) {
       return str.replace(
           /\w\S*/g,
           function(txt) {
               return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
           }
       );
   }

  render() {
    const diseases = this.sortDiseases();
    let container = [];
    for (let i = 0; i < diseases.length; i++) {
      let title = this.toTitleCase(diseases[i].name)
      if (diseases[i].title){
        title = this.toTitleCase(diseases[i].title)
      }
      const link =
        "Info/" + title;
      container.push(
        <Link to={link} className="result-link">
          <div className="result">
            <h3 className="result-content">
              {" "}
              {diseases[i].title ? diseases[i].title : diseases[i].name}{" "}
            </h3>
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
          <h1 className="header-name">Diseases</h1>
        </div>
        <div> {container} </div>
      </div>
    );
  }
}

export default mainLayout(Disease);
