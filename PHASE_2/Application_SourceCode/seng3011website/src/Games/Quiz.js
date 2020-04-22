import React, { Component, Fragment } from "react";
import mainLayout from "../MainLayout.js";
import quizdata from "./question";
import Answer from "./Answer";
import logo from "../img/virus.png";
import axios from 'axios';
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


class Quiz extends Component {
  state = {
    dataQuestion: [],
    show:false,
    isOpen: false
  };

  hideModal = () => {
    this.setState({
      isOpen:false
    });
    console.log("hide")
  };

  showModal = () => {
    this.setState({
      isOpen:true
    });
    console.log("show")
    console.log(this.state.isOpen)
    this.submitAnswer()
  };

 setStatefunstion = () => {
    //  use reactjs setState
    this.setState({
      dataQuestion: quizdata
    });
    localStorage.removeItem('score')
  };

  componentDidMount() {
    this.setStatefunstion();
  }

  submitAnswer = () => {
    let sc = localStorage.getItem('score')
    let name = localStorage.getItem('username')
    let disease = localStorage.getItem('game-disease')
    console.log(sc)
    console.log(name)
    console.log(disease)

    axios.post('/savegame', {
      username:name,
      quiz:disease,
      score:sc
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log("submit score error");
    });
  };

  render() {
    return (
      <Fragment>
        <div className="quiz-div">
          <img
            src={logo}
            className="quiz-img"
            alt="Logo"
            width="110"
            height="100"
          />
          <div className="quiz-name">Quiz</div>
        </div>
        {this.state.dataQuestion.map(data => {
          return (
            <div key={data.id}>
              <div className="question"> {data.question} </div>
              <div className="answers">
                <Answer
                  key={data.id}
                  id={data.id}
                  correct={data.correct}
                  ans={data.answers}
                />
              </div>
            </div>
          );
        })}
        <button className = "submitBtn" onClick={()=>this.showModal()}> Submit </button>
        <Modal show={this.state.isOpen} onHide={()=>this.hideModal()}>
          <Modal.Header>
            <h3>Your score for this mission is </h3>
          </Modal.Header>
            <div className="quiz-div">
          <img
            src={logo}
            className="quiz-img"
            alt="Logo"
            width="110"
            height="100"
          />
            <div className="quiz-name">{localStorage.getItem('score')}/10</div>
          </div>
          <Modal.Footer>
          <Link to="/Home">
            <Button className = "submitBtn">
              Go to Home
            </Button>
          </Link>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default mainLayout(Quiz);
