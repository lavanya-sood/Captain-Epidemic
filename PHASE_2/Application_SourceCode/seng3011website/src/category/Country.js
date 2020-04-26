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
import { Pagination } from "react-bootstrap";

class Country extends Component {
  state = {
    container: this.getCountry('ALL')
  }
  getCountry(letter) {
    let container = [];
    if (letter === 'ALL') {
      for (let i = 0; i < locations.length; i++) {
        const link = "location/" + locations[i];
        container.push(
          <Link to={link} className="result-link">
            <div className="result-locations1">
              {/* <img src={aus} className="result-img"></img> */}
              <h3 className="result-content"> {locations[i]} </h3>
            </div>
          </Link>
        );
      }
      return container
    }
    for (let i = 0; i < locations.length; i++) {
      if (locations[i][0] === letter) {
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
    }
    if (container.length === 0) {
      container.push(<h3>Oh no! No countries found</h3>)
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
          <h2 className="header-name">Locations</h2>
        </div>
        <div id = 'container'> {this.state.container} </div>
      </div>
    );
  }
}

export default mainLayout(Country);
