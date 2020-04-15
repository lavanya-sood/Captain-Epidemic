import React, { Component, Fragment } from "react";

class Answer extends React.Component {

//  create state
  state = {
    Answers: this.props.ans,
    Clickcheck:true,
    rightAnswer: this.props.correct,
    ansLength : this.props.noQues
  };

  // Event on button
  checkAnswer = (e) => {
    this.setState({
      Clickcheck:false
    });
    if (e.target.innerHTML === this.props.correct){
      return  <button > {this.props.correct}</button>;
    } else {
      return  <button > {this.props.correct}</button>;
    }

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
