import React, { Component } from "react";
import mainLayout from "./MainLayout.js";
import "./css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import virus1 from './img/virus3.png';
import virus2 from './img/virus1.png';
import virus3 from './img/virus5.png';

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
                  <div>
                  <Link to="/Info">
                    <img src={virus1} class="virusImg" href='/'alt="Super"/>
                    <h2 class="diseaseTrend"> CORONAVIRUS </h2>
                    </Link>
                      <br/>
                    <Link to="/Quiz">
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
                    <img src={virus2} class="virusImg" href='/'alt="Super"/>
                    <h2 class="diseaseTrend"> EBOLA </h2>
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
                    <img src={virus3} class="virusImg" href='/'alt="Super"/>
                    <h2 class="diseaseTrend"> PANDEMIC </h2>
          
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
