import React, { Component, Fragment } from "react";
import mainLayout from "../MainLayout.js";
import ebola_quizdata from "./covid_question";
import general_quizdata from "./general_question";
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
    if (localStorage.getItem("score") === null) {
      alert('Please complete the quiz')
      return;
    }
    this.setState({
      isOpen:true
    });
    this.submitAnswer()
  };

 setStatefunstion = () => {
    //  use reactjs setState
    this.setState({
      dataQuestion: ebola_quizdata
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

    var storedQuiz= JSON.parse(localStorage.getItem("quiz"));
    if (!storedQuiz.includes(disease)){
      let g = localStorage.getItem('games')
      let new_sum_games = parseInt(g) + 1
      localStorage.setItem('games',new_sum_games)
      console.log('add game')
      axios.post('/savegame', {
        username:name,
        quiz:disease,
        score:sc,
        icon:localStorage.getItem('game-icon')
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log("submit score error");
      });
    } else {
      axios.post('/updategame', {
        username:name,
        quiz:disease,
        score:sc
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log("error");
      });
      console.log('update quiz score')
    }
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
            <div className="quiz-name">{localStorage.getItem('score')}/5</div>
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
