import React, { Component } from "react";
import logo from './img/Logo.png';
import {Container,Row,Col} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
      <div>
        <h2>Trending</h2>
        <Container>
          <Row>
            <Col>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={logo} class="project-image"/>
                </div>
              
                <div class="flip-card-back">
                  <h3>GlobeShoppers</h3> 
                  <p>A online trading platform that allows it's users to purchase items from overseas and avoid shipping costs</p> 
                  <button onclick="window.location.href = 'https://github.com/lavanya-sood/GlobeShoppers-SENG2021';" class="button-primary"> See Project Files </button>
                </div>
              </div>
            </div>
            </Col>
            <Col>
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src={logo} class="project-image"/>
                  </div>
                
                  <div class="flip-card-back">
                    <h3>GlobeShoppers</h3> 
                    <p>A online trading platform that allows it's users to purchase items from overseas and avoid shipping costs</p> 
                    <button onclick="window.location.href = 'https://github.com/lavanya-sood/GlobeShoppers-SENG2021';" class="button-primary"> See Project Files </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={logo} class="project-image"/>
                </div>
              
                <div class="flip-card-back">
                  <h3>GlobeShoppers</h3> 
                  <p>A online trading platform that allows it's users to purchase items from overseas and avoid shipping costs</p> 
                  <button onclick="window.location.href = 'https://github.com/lavanya-sood/GlobeShoppers-SENG2021';" class="button-primary"> See Project Files </button>
                </div>
              </div>
            </div>
            </Col>
          </Row>
        </Container>
        


        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
}

export default Home;
