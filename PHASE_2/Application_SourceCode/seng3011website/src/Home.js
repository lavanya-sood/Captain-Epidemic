import React, { Component } from "react";
import title from './img/titlecard.jpg';
import Profile from "./Profile";
import MapContainer from './Map.js';
import {
  Link
} from "react-router-dom";
import {Container,Row,Col,Button} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div>
        <div id="trending">
          <h2 class="headingpage">Discover</h2>
          <Container id="trending-topics">
            <Row>
              <Col>
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    {/* <img src={title} class="project-image"/> */}
                    <h2> CORONAVIRUS </h2>
                </div>
                
                  <div class="flip-card-back">
                      <Link to='/Profile'>
                      <Button className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Profile'>
                      <Button className="button-primary-flip"> Play Quiz </Button>
                      </Link>
                  </div>
                </div>
              </div>
              </Col>
              <Col>
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h2> EBOLA </h2>
                    </div>
                  
                    <div class="flip-card-back">
                      <Link to='/Profile'>
                      <Button onclick="window.location.href = '/';" className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Profile'>
                      <Button className="button-primary-flip"> Play Quiz </Button>
                      </Link>
                  </div>
                  </div>
                </div>
              </Col>
              <Col>
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                      <h2> YELLOW FEVER </h2>
                  </div>
                
                  <div class="flip-card-back">
                      <Link to='/Profile'>
                      <Button onclick="window.location.href = '/';" className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Profile'>
                      <Button className="button-primary-flip"> Play Quiz </Button>
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
          <Button className="button-map"> <h2> Learn about the disease around the world </h2> </Button>
        </Link>
            
        </div>

        <div id="categories">
          <h2 class="headingpage"> Categories</h2>
          <Container id="trending-topics">
            <Row>
              <Col>
                <Link to='/Profile'>
                  <Button className="button-category"> <h3>DISEASES</h3> </Button>
                </Link>
              </Col>
              <Col>
                <Link to='/Profile'>
                  <Button className="button-category"> <h3>LOCATIONS</h3> </Button>
                </Link>
              </Col>
            </Row>
          </Container>
          
          
            
        </div>

      </div>
    );
  }
}

export default Home;
