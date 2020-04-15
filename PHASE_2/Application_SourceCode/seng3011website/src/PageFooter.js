import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {Container,Row,Col} from 'react-bootstrap';
import pageheading from './img/bigheading.png';
import './css/PageFooter.css';

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
                            </div>
                        </Col>
                        <Col>
                            <h4> FOR INQUIRIES: </h4>
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