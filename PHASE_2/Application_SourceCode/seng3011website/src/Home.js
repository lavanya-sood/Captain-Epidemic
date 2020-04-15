import React, { Component } from "react";
import mainLayout from "./MainLayout.js";
import "./css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

class Home extends Component {

  setGameDisease = (e) => {
    console.log(e.target.id);
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
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      {/* <img src={title} className="project-image"/> */}
                      <h2> CORONAVIRUS </h2>
                    </div>

                  <div className="flip-card-back">
                      <Link to='/Info'>
                      <Button className="button-primary-flip">
                      {" "}
                      Learn More{" "}
                    </Button>
                      </Link>
                      <br />
                      <Link to="/Quiz">
                        <Button className="button-primary-flip" id = "coronavirus" onClick={(e) => this.setGameDisease(e)}>
                          {" "}
                          Play Quiz{" "}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h2> EBOLA </h2>
                    </div>

                    <div className="flip-card-back">

                      <Link to="/Info">
                        <Button className="button-primary-flip">
                          {" "}
                          Learn More{" "}
                        </Button>
                      </Link>
                      <br />
                      <Link to="/Quiz">
                        <Button className="button-primary-flip">
                          {" "}
                          Play Quiz{" "}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h2> YELLOW FEVER </h2>
                    </div>


                    <div className="flip-card-back">
                      <Link to="/Info">
                        <Button className="button-primary-flip">
                          {" "}
                          Learn More{" "}
                        </Button>

                      </Link>
                      <br />
                      <Link to="/Quiz">
                        <Button className="button-primary-flip">
                          {" "}
                          Play Quiz{" "}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="map-location">
        <Link to='/map'>
          <Button className="button-map"> <p id="mapheading">Learn about diseases around the world </p> </Button>
        </Link>

        </div>

        <div id="categories">
          <h2 className="headingpage"> Categories</h2>
          <Container id="trending-topics">
            <Row>
              <Col>
                <Link to='/disease'>
                  <Button className="button-category"> <h2>DISEASES</h2> </Button>
                </Link>
              </Col>
              <Col>
                <Link to='/country'>
                  <Button className="button-category"> <h2>LOCATIONS</h2> </Button>
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
