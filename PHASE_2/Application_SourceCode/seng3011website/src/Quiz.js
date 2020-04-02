
import React, { Component, Fragment } from "react";
import quizdata from './question'
import Answer from "./Answer";

class Quiz extends Component{

  state={
    dataQuestion:[],
  }


 setStatefunstion = () =>{

//  use reactjs setState
  this.setState( {
    dataQuestion:quizdata
  })
}


  componentDidMount(){
    this.setStatefunstion();
  }


  render() {

    return(
      <Fragment>
      <div>
      </div>
         {
          this.state.dataQuestion.map( data => {
          return <div key={ data.id} >
                      <div className = "question"> <h4> { data.question}</h4> </div>
                     <Answer key={ data.id} id = {data.id} correct={ data.correct} ans={ data.answers} />
                 </div>
          })
         }

      </Fragment>
    );
  }
}

export default Quiz;
