import React, { Component, Fragment } from "react";
import mainLayout from "../MainLayout.js";
import quizdata from "./question";
import Answer from "./Answer";
import logo from "../img/virus.png";
import Hangman from "./Hangman";
import { Link } from "react-router-dom";
import {  Button } from "react-bootstrap";

class Quiz extends Component {
  state = {
    dataQuestion: []
  };

  setStatefunction = () => {
    //  use reactjs setState
    this.setState({
      dataQuestion: quizdata
    });
  };

  componentDidMount() {
    this.setStatefunction();
    var x = localStorage.getItem('username');
    console.log(x);
  }

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
                  noQues = {this.state.dataQuestion.length}
                />
              </div>
            </div>
          );
        })}
        <Link to='/Hangman'>
        <Button  className="next-button">
        Next
        </Button>
        </Link>

      </Fragment>
    );
  }
}

export default mainLayout(Quiz);
