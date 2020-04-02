import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import {Container,Row,Col,Button} from 'react-bootstrap';
import pageheading from './img/bigheading.png';

class Footer extends Component {
    render() {
        return (
            <div id="outro-part">
                <Container id="trending-topics">
            <Row>
              <Col>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>
            </Container>
                <div class = "pure-g">
                    <div class="pure-u-1-3">
                        <img src="../static/img/webpage-name.png" id = "outroname">
                    </div>
                    <div class="pure-u-1-3">
                        <div id = "outro-links">
                            <button class="outro-buttons" onclick="window.location.href='{{url_for('aboutus')}}'" name = about> About Us </button>
                            <button class="outro-buttons" onclick="window.location.href='{{url_for('howitworks')}}';" name = how> How GlobeShoppers works </button>
                            <button class="outro-buttons" onclick="window.location.href='{{url_for('termsandconditions')}}';" name = terms> Terms of Use </button>
                            <button class="outro-buttons"> Privacy Policy </button>
                        
                        </div>
                    </div>
                    <div class="pure-u-1-3">
                        <h3> FOR INQUIRES: </h3>
                        <p> support@globeshoppers.com </p>
                        <p> +61 123 456 789</p>
                        <h4> For partnership: </h4>
                        <p> partners@globeshoppers.com </p>
                    </div>
                </div>
                <hr>
                <div class = "pure-g">
                    <div class="pure-u-1-2" style="text-align:right;">
                        <img src="../static/img/comingapple.png" class = "comingapp">
                    </div>
                    <div class="pure-u-1-2" style="text-align:left;">
                        
                        <img src="../static/img/cominggoogle.png" class = "comingapp">
                    </div>
                </div>
	        </div>
        );
    }
}