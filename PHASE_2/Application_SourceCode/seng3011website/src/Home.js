import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import {Container,Row,Col,Button} from 'react-bootstrap';
import Quiz from "./Games/Quiz";


class Home extends Component {
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
                      <Link to='/Profile'>
                      <Button className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Quiz'>
                      <Button className="button-primary-flip"> Play Quiz </Button>
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
                      <Link to='/Profile'>
                      <Button  className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Quiz'>
                      <Button className="button-primary-flip"> Play Quiz </Button>
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
                      <Link to='/Profile'>
                      <Button  className="button-primary-flip"> Learn More </Button>
                      </Link>
                      <br/>
                      <Link to='/Quiz'>
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
          <h2 className="headingpage"> Categories</h2>
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
