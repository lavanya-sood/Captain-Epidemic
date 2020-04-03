import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import {Container,Row,Col,Button} from 'react-bootstrap';
import pageheading from './img/bigheading.png';

class PageFooter extends Component {
    render() {
        return (
            <div id="outro-part">
                <Container id="trending-topics">
                    <Row>
                        <Col>
                            <img src={pageheading}  href='/' id = "outroname" alt="Website logo"/>
                        </Col>
                        <Col>
                            <div id = "outro-links">
                                <NavLink className="outro-buttons" to="/profile">About us</NavLink>
                                <NavLink className="outro-buttons" to="/profile">How TAOCE works</NavLink>
                                <NavLink className="outro-buttons" to="/profile">Terms of Use</NavLink>
                                <NavLink className="outro-buttons" to="/profile">Privacy Policy</NavLink>
                                {/* <Button className="outro-buttons" > About Us </Button>
                                <Button className="outro-buttons" > How GlobeShoppers works </Button>
                                <Button className="outro-buttons" > Terms of Use </Button>
                                <Button className="outro-buttons"> Privacy Policy </Button>
                             */}
                            </div>
                        </Col>
                        <Col>
                            <h3> FOR INQUIRES: </h3>
                            <p> support@taoce.com </p>
                            <p> +61 123 456 789</p>
                            <h4> For partnership: </h4>
                            <p> partners@taoce.com </p>
                        </Col>
                    </Row>
                </Container>
                </div>
        );
    }
}

export default PageFooter;