import React, { Component, useState,render } from "react";
import {Navbar,Nav,Table,Button,Dropdown,Modal} from 'react-bootstrap';

export class Message extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="messageModal"
          >
            <closeButton/>
              
            <Modal.Body class="messageBody">
                <p class="signoff"> HELLO YOUNG HEROES,</p>
                <p> Join me in my quest to defeat the evil diseases that are taking over the world.</p>
                <p> BUT HOW CAN YOU HELP ME DEFEAT THEM?</p>
                <p> Through your knowledge of course! </p>
                <p> Learn about all the different diseases by playing the quizzes and receiving badges. Each badge helps defeat the disease so COLLECT THEM ALL!</p>
                <p class="signoff"> SIGNED, CAPTAIN EPIDEMIC </p>
            </Modal.Body>
          </Modal>
        );
    }
}