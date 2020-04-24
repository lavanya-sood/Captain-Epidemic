import React, { Component } from "react";
import mainLayout from "./MainLayout.js";
import "./css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import virus1 from './img/virus3.png';
import virus2 from './img/virus1.png';
import coronavirus from './img/virus5.png';
import fancymap from './img/mapping.png';
import waves from './img/waves.png';


class Home extends Component {

  setGameDisease = (e) => {
    localStorage.setItem('game-disease', e.target.id);

  };

  render() {
    return (
      <div>
        <div id="trending">
          <h2 className="headingpage">Discover</h2>
          <Container id="trending-topics">
            <Row>
              <Col>
                  <div>
                  <Link to="/Info">
                    <img src={coronavirus} className="virusImg" href='/Info'alt="Super"/>
                    <h2 className="diseaseTrend"> CORONAVIRUS </h2>
                    </Link>
                      <br/>
                    <Link to="/Quiz">
                        <Button className="button-primary-flip" id = "coronavirus" onClick={(e) => this.setGameDisease(e)}>
                          {" "}
                          Play Game{" "}
                        </Button>
                        </Link>
                  </div>
              </Col>
              <Col>
              <div>
              <Link to="/Info">
                    <img src={virus2} className="virusImg" href='/'alt="Super"/>
                    <h2 className="diseaseTrend"> EBOLA </h2>
                      </Link>
                      <br/>
                    <Link to="/Hangman">
                        <Button className="button-primary-flip" id = "ebola" onClick={(e) => this.setGameDisease(e)}>
                          {" "}
                          Play Game{" "}
                        </Button>
                        </Link>
                  </div>

              </Col>
              <Col>
              <div>
              <Link to="/Info">
                    <img src={virus1} className="virusImg" href='/'alt="Super"/>
                    <h2 className="diseaseTrend"> YELLOW FEVER </h2>

                      </Link>
                      <br/>
                    <Link to="/Hangman">
                        <Button className="button-primary-flip" id = "yellow fever" onClick={(e) => this.setGameDisease(e)}>
                          {" "}
                          Play Game{" "}
                        </Button>
                        </Link>
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="map-location">
        <Link to='/map'>
          {/* <Button className="button-map"> <p id="mapheading">Learn about diseases around the world </p> </Button> */}
          <img src={fancymap} className="mapImg" href='/'alt="Super"/>
          <p id="mapheading">Learn about diseases around the world </p>
        </Link>
          {/* <div id="mapbase">
          <img src={waves} className="waves" href='/'/>
          </div> */}
        </div>

        <div id="categories">
          <h2 className="headingpage"> Categories</h2>
          <Container id="trending-topics">
            <Row>
              <Col>
                <Link to='/disease'>
                  {/* <Button className="button-category"> <h2>DISEASES</h2> </Button> */}
                  <button className="categorybuttons" id="diseasesbutton"> <h2>Diseases</h2> </button>
                </Link>
              </Col>
              <Col>
                <Link to='/country'>
                <button className="categorybuttons" id="locationsbutton"> <h2> Locations </h2> </button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default mainLayout(Home);
