import React, { Component, Fragment } from "react";
class Answer extends Component {

//  create state
  state = {
    Answers: this.props.ans,
    Clickcheck:true,
    rightAnswer: this.props.correct,
  };

  // Event on button
  checkAnswer = (e) => {
    this.setState({
      Clickcheck:false
    });
    console.log(this.key);
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
          return <button className = "answerBtn" onClick={(e) => this.checkAnswer(e)}>{ans}</button>;
        }) : <button className = "answerBtn"> {this.state.rightAnswer}</button>  }

      </Fragment>

    );
  }
}

export default Answer;
