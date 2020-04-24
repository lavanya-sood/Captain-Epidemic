import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";

import "../css/pure-min.css";
import "../css/SearchResult.css";

class Disease extends Component {
  
  diseases = [
    { "name": "unknown", "type": "germIcon" },
    { "name": "other", "type": "germIcon" },
    { "name": "anthrax cutaneous", "type": "bacteriaIcon", "title": "anthrax" },
    { "name": "anthrax gastrointestinous", "type": "bacteriaIcon", "title": "anthrax" },
    { "name": "anthrax inhalation","type": "bacteriaIcon", "title": "anthrax" },
    { "name": "botulism", "type": "bacteriaIcon" },
    { "name": "brucellosis", "type": "bacteriaIcon" },
    { "name": "chikungunya", "type": "virusIcon" },
    { "name": "cholera", "type": "bacteriaIcon"},
    { "name": "cryptococcosis", "type": "fungusIcon" },
    { "name": "cryptosporidiosis", "type": "parasiteIcon" },
    { "name": "crimean-congo haemorrhagic fever", "type": "virusIcon" },
    { "name": "dengue", "type": "virusIcon" },
    { "name": "diphteria", "type": "bacteriaIcon" },
    { "name": "ebola haemorrhagic fever", "type": "virusIcon", "title": "ebola" },
    { "name": "ehec (e.coli)", "type": "bacteriaIcon" },
    { "name": "enterovirus 71 infection", "type": "virusIcon", "title": "enterovirus" },
    { "name": "influenza a/h5n1", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h7n9", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h9n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h1n1", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h1n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h3n5", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h3n2", "type": "virusIcon", "title": "influenza" },
    { "name": "influenza a/h2n2", "type": "virusIcon", "title": "influenza" },
    { "name": "hand, foot and mouth disease", "type": "virusIcon" },
    { "name": "hantavirus", "type": "virusIcon" },
    { "name": "hepatitis a", "type": "virusIcon" },
    { "name": "hepatitis b", "type": "virusIcon" },
    { "name": "hepatitis c", "type": "virusIcon" },
    { "name": "hepatitis d", "type": "virusIcon" },
    { "name": "hepatitis e", "type": "virusIcon" },
    { "name": "histoplasmosis", "type": "fungusIcon" },
    { "name": "hiv/aids", "type": "virusIcon" },
    { "name": "lassa fever", "type": "virusIcon" },
    { "name": "malaria", "type": "parasiteIcon" },
    { "name": "marburg virus disease", "type": "virusIcon" },
    { "name": "measles", "type": "virusIcon" },
    { "name": "mers-cov", "type": "virusIcon" },
    { "name": "mumps", "type": "virusIcon" },
    { "name": "nipah virus", "type": "virusIcon" },
    { "name": "norovirus infection", "type": "virusIcon" },
    { "name": "pertussis", "type": "bacteriaIcon" },
    { "name": "plague", "type": "bacteriaIcon" },
    { "name": "pneumococcus pneumonia", "type": "bacteriaIcon", "title": "bacterial pneumonia" },
    { "name": "poliomyelitis", "type": "virusIcon", "title": "polio" },
    { "name": "q fever", "type": "bacteriaIcon" },
    { "name": "rabies", "type": "virusIcon" },
    { "name": "rift valley fever", "type": "virusIcon" },
    { "name": "rotavirus infection", "type": "virusIcon" },
    { "name": "rubella", "type": "virusIcon" },
    { "name": "salmonellosis", "type": "bacteriaIcon", "title": "salmonella" },
    { "name": "sars", "type": "virusIcon" },
    { "name": "shigellosis", "type": "bacteriaIcon" },
    { "name": "smallpox", "type": "virusIcon" },
    { "name": "staphylococcal enterotoxin b", "type": "bacteriaIcon", "title": "enterotoxin disease" },
    { "name": "thypoid fever", "type": "bacteriaIcon" },
    { "name": "tuberculosis", "type": "bacteriaIcon" },
    { "name": "tularemia", "type": "bacteriaIcon" },
    { "name": "vaccinia and cowpox", "type": "virusIcon", "title": "cowpox" },
    { "name": "varicella", "type": "virusIcon", "title": "chickenpox" },
    { "name": "west nile virus", "type": "virusIcon" },
    { "name": "yellow fever", "type": "virusIcon" },
    { "name": "yersiniosis", "type": "bacteriaIcon" },
    { "name": "zika", "type": "virusIcon" },
    { "name": "legionares", "type": "bacteriaIcon" },
    { "name": "listeriosis", "type": "bacteriaIcon" },
    { "name": "monkeypox", "type": "virusIcon" },
    { "name": "COVID-19", "type": "virusIcon", "title": "coronavirus" }
    ]
    sortDiseases = () => {
      return this.diseases.sort((a, b) => a.name.localeCompare(b.name))
    }
    
  render() {
    const diseases = this.sortDiseases();
    let container = [];
    for (let i = 0; i < diseases.length; i++) {
      container.push(
        <Link to="info/{diseases[i].name}" className="result-link">
        <div className="result">
          <h3 className="result-content"> {diseases[i].name} </h3>
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
        {/* <Link to="info/coronavirus" className="result-link">
          <div className="result">
            <h3 className="result-content">CORONAVIRUS</h3>
          </div>
        </Link> */}
        <div> {container} </div>
        
      </div>
    );
  }
}

export default mainLayout(Disease);
