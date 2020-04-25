import React, { Component } from "react";
import { Link } from "react-router-dom";
import mainLayout from "../MainLayout.js";
import logo from "../img/virus5.png";
import { diseases } from "./DiseaseData";
import "../css/pure-min.css";
import "../css/SearchResult.css";
import { Pagination } from "react-bootstrap";

function sortDiseases() {
  return diseases.sort(function (a, b) {
    var nameA = a.name,
      nameB = b.name;
    if (a.title) nameA = a.title;
    if (b.title) nameB = b.title;
    return nameA.localeCompare(nameB);
  });
};

function toTitleCase(str) {
     return str.replace(
         /\w\S*/g,
         function(txt) {
             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
         }
     );
 }

class Disease extends Component {
  state = {
    container: this.getCountry('ALL')
  }
   getCountry(letter) {
    const diseases = sortDiseases();
    let container = [];
    if (letter === 'ALL') {
      for (let i = 0; i < diseases.length; i++) {
        let title = toTitleCase(diseases[i].name)
        if (diseases[i].title){
          title = toTitleCase(diseases[i].title)
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
      return container
    }
    for (let i = 0; i < diseases.length; i++) {
      let title = toTitleCase(diseases[i].name)
      if (diseases[i].title) {
        title = toTitleCase(diseases[i].title)
      }
      if (title[0] === letter) {  
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
    }
    if (container.length === 0) {
      container.push(<h3>Oh no! No diseases found</h3>)
    }
    return container
  }
  setList(event) {
    if (event.target.text === '') {
      return
    }
    this.setState({
      container: this.getCountry(event.target.text)
    })
  }

  render() {
    return (
      <div className="result-div">
        <Pagination className='pagination-results' onClick={this.setList.bind(this)}>
          <Pagination.Item >ALL</Pagination.Item>
          <Pagination.Item >A</Pagination.Item>
          <Pagination.Item>B</Pagination.Item>
          <Pagination.Item>C</Pagination.Item>
          <Pagination.Item>D</Pagination.Item>
          <Pagination.Item>E</Pagination.Item>
          <Pagination.Item>F</Pagination.Item>
          <Pagination.Item>G</Pagination.Item>
          <Pagination.Item>H</Pagination.Item>
          <Pagination.Item>I</Pagination.Item>
          <Pagination.Item>J</Pagination.Item>
          <Pagination.Item>K</Pagination.Item>
          <Pagination.Item>L</Pagination.Item>
          <Pagination.Item>M</Pagination.Item>
          <Pagination.Item>N</Pagination.Item>
          <Pagination.Item>O</Pagination.Item>
          <Pagination.Item>P</Pagination.Item>
          <Pagination.Item>Q</Pagination.Item>
          <Pagination.Item>R</Pagination.Item>
          <Pagination.Item>S</Pagination.Item>
          <Pagination.Item>T</Pagination.Item>
          <Pagination.Item>U</Pagination.Item>
          <Pagination.Item>V</Pagination.Item>
          <Pagination.Item>W</Pagination.Item>
          <Pagination.Item>X</Pagination.Item>
          <Pagination.Item>Y</Pagination.Item>
          <Pagination.Item>Z</Pagination.Item>
        </Pagination>
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
        <div> {this.state.container} </div>
      </div>
    );
  }
}

export default mainLayout(Disease);
