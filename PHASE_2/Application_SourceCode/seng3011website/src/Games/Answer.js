import React, { Component, Fragment } from "react";

class Answer extends React.Component {

//  create state
  state = {
    Answers: this.props.ans,
    Clickcheck:true,
    rightAnswer: this.props.correct,
    ansLength : this.props.noQues,
  };

  // Event on button
  checkAnswer = (e) => {
    this.setState({
      Clickcheck:false
    });
    // record number of correct ques
    if (e.target.innerHTML === this.props.correct){
      if (localStorage.getItem("score") === null) {
        localStorage.setItem('score',1);
      } else {
        let s =  parseInt(localStorage.getItem('score')) + 1;
        localStorage.setItem('score', s);
      }
    }
    if (localStorage.getItem("score") === null) {
      localStorage.setItem('score',0);
    }
    return  <button > {this.props.correct}</button>;
  };

  render() {
    return (
      <Fragment>

        { this.state.Clickcheck  ? this.state.Answers.map(ans => {
          return <button key = {ans} className = "answerBtn" onClick={(e) => this.checkAnswer(e)}>{ans}</button>;
        }) : <button key = "ansbutton" className = "answerBtn"> {this.state.rightAnswer}</button>  }

      </Fragment>

    );
  }
}

export default Answer;
