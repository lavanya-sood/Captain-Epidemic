import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import './css/Profile.css';
import { Link } from "react-router-dom";
import Modal1 from './edit/EditAvatar';

import recruitImg from './img/recruit.png';
import cadetImg from './img/cadet.png';
import corporalImg from './img/corporal.png';
import sergeantImg from './img/sergeant.png';
import lieutenantImg from './img/lieutenant.png';
import commanderImg from './img/commander.png';
import majorImg from './img/major.png';
import captainImg from './img/captain.png';

import recruitImgDisabled from './img/recruit_disabled.png';
import cadetImgDisabled from './img/cadet_disabled.png';
import corporalImgDisabled from './img/corporal_disabled.png';
import sergeantImgDisabled from './img/sergeant_disabled.png';
import lieutenantImgDisabled from './img/lieutenant_disabled.png';
import commanderImgDisabled from './img/commander_disabled.png';
import majorImgDisabled from './img/major_disabled.png';
import captainImgDisabled from './img/captain_disabled.png';

import profilePic from './img/profile_pic.png';
import background from './img/profile_background.png';
import passportIcon from './img/passport.png';
import star from './img/star_og.png';
import axios from 'axios';
import coronavirus from './img/virus5.png';
import ebola from './img/virus1.png';
import virus2 from './img/virus2.png';
import yellowfever from './img/virus3.png';
import virus4 from './img/virus4.png';
import virus5 from './img/virus5.png';
import virusIcon from './img/virusIcon.png';
import bacteriaIcon from './img/bacteriaIcon.png';
import fungusIcon from './img/fungusIcon.png';
import parasiteIcon from './img/parasiteIcon.png';
import germIcon from './img/germIcon.png';
import mainLayout from './MainLayout';

class Profile extends Component {
  // get data from db

  constructor(props) {
    super(props);
  }

  state = {
    numGames : '',
    rank : "none",
    completedQuiz:[],
    username: localStorage.getItem('username'),
    dob: localStorage.getItem('dob'),
    image: localStorage.getItem('image'),
    avatar: false,
    addModalShow:false


  }
  callAPI(){
    fetch("/getgame")
        .then(res => res.json())
        .then( res => {
          let sum = 0
          let quiz = []
          // store all quiz and score
          var allquizzes = {};
          var game = []
          allquizzes.game = game;
          for (var i = 0;i < res.length;i++){
            if (res[i]['username'] === localStorage.getItem('username')){
              // dont count same quiz twice
                sum ++;
                quiz.push(res[i]['quiz']);
                var item = {
                  "quiz": res[i]['quiz'],
                   "score": res[i]['score'],
                   "icon":res[i]['icon']
                }
                allquizzes.game.push(item);
            }
          }
          localStorage.setItem('quiz',JSON.stringify(quiz))
          let rank = recruitImg
          this.setState({
            numGames:sum,
            completedQuiz:allquizzes['game']
          })
          if (this.state.numGames == 40){
            rank = captainImg
          } else if (this.state.numGames >= 30){
            rank = majorImg
          } else if (this.state.numGames >= 21){
            rank = commanderImg
          } else if (this.state.numGames >= 15){
            rank = lieutenantImg
          } else if (this.state.numGames >= 10){
            rank = sergeantImg
          } else if (this.state.numGames >= 6){
            rank = corporalImg
          } else if (this.state.numGames >= 3){
            rank = cadetImg
          }
          this.setState({
            rank:rank
          })
    })
  }

  componentWillMount() {
    this.callAPI()
    // set correct rank image

   }

 toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
  }
  getAge(time){
    var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
    var date_array = time.split('-')
    var years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return Math.floor(years_elapsed);
  }
  handleSubmit(event) {
    this.showModal(event);
  }

  showModal(event) {
      this.setState ({
          avatar: !this.state.avatar
      })
      event.preventDefault();
  }


  render() {
    let addModalClose = () => this.setState({addModalShow:false});
    return (
      <div>
      <Modal1 show={this.state.addModalShow} onHide={addModalClose}/>

        <div className="passport ">
      {/*----PASSPORT---*/}
          <div  className = "separator"> PASSPORT </div>
      {/*Passport icon*/}
          <img src={passportIcon} align = "left" className="passport-image" alt=""/>
      {/*profile pic*/}
          <div className = "images">
            <img src={'./img/'+localStorage.getItem('image')} align = "left" className="profile-image" alt=""/>
          </div>
          {/*edit button*/}
          <div className = "images">
            <button className = "edit-button-avatar" type="button" value="EditAvatar" onClick={()=>this.setState({addModalShow:true})}> Edit Avatar </button>
          </div>
      {/*spyname: change fonts? to external handwriting fontsPUT TABLE HERE */}
          <Table borderless size="sm" style = {{"marginBottom":"0px"}}>
          <tbody style = {{"marginTop":"0px"}}>
            <tr>
            <td colSpan = "2">
            <h1 style = {{"fontSize":"70px","color":"#0e2930", "fontFamily" : "Stella", 'marginTop': '0px', 'marginBottom':'0px'}}> {(this.state.username).toUpperCase()} <img src={this.state.rank} className = "rank-icon" alt=""/></h1>
            </td>
            </tr>
            {/*<tr>
            <td style = {{"padding" : "0px 0px 0px 0px"}}> <h5 style={{"fontFamily":"handwriting", 'fontSize': '40px' }}>Agent Name: </h5></td>
            <td style = {{"padding" : "0px 0px 0px 0px"}}> <h5 style={{"textDecoration": "underline", "fontFamily":"Chalkduster", "paddingTop":"10px"}}>emily101</h5></td>
            </tr>*/}
            <tr>

            <td > <h5 style={{"paddingLeft": "20px","fontFamily":"handwriting", 'fontSize': '40px'}}>Age: </h5></td>
            <td > <h5 style={{"textDecoration": "underline", "fontFamily":"Chalkduster", "paddingTop":"10px"}}>{this.getAge(this.state.dob)} years old</h5></td>
            </tr>
          </tbody>
          </Table>
        </div>

        <div className="divider"></div>

      {/* Rank Stamps might incase in div  */}
        <div className = "rank-table">
          <Table borderless size="sm">
            <thead>
              <tr>
                <td colSpan = "4">
                  <div  className = "separator"> BADGES OF HONOUR </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={recruitImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = "rank-name" > Recruit </h1>
                  <p className = "rank-stamp"> [Welcome_Aboard!] </p> </div>
                </td>
                <td><img src= {this.state.numGames < 15 ? lieutenantImgDisabled : lieutenantImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 15 ? '-disabled' : '')}> Lieutenant </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 15 ? '-disabled' : '')}> [15_Missions_Completed] </p> </div>
                </td>
              </tr>
              <tr>
                <td><img src={this.state.numGames < 3 ? cadetImgDisabled : cadetImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 3 ? '-disabled' : '')} > Cadet </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 3 ? '-disabled' : '')}> [3_Missions_Completed] </p> </div>
                </td>
                <td><img src={this.state.numGames < 21 ? commanderImgDisabled : commanderImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 21 ? '-disabled' : '')}> Commander </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 21 ? '-disabled' : '')}> [21_Missions_Completed] </p> </div>
                </td>
              </tr>
              <tr>
                <td><img src={this.state.numGames < 6 ? corporalImgDisabled : corporalImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 6 ? '-disabled' : '')} > Corporal </h1>
                  <p className ={"rank-stamp" + (this.state.numGames < 6 ? '-disabled' : '')}> [6_Missions_Completed] </p> </div>
                </td>
                <td><img src={this.state.numGames < 30 ? majorImgDisabled : majorImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 30 ? '-disabled' : '')}> Major </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 30 ? '-disabled' : '')}> [30_Missions_Completed] </p> </div>
                </td>
              </tr>
              <tr>
                <td><img src={this.state.numGames < 10 ? sergeantImgDisabled : sergeantImg} className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 10 ? '-disabled' : '')} > Sergeant </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 10 ? '-disabled' : '')} > [10_Missions_Completed] </p> </div>
                </td>
                <td><img src={this.state.numGames < 40 ? captainImgDisabled : captainImg}  className = "rank"/></td>
                <td><div className = "images">
                  <h1 className = {"rank-name" + (this.state.numGames < 40 ? '-disabled' : '')}> Captain </h1>
                  <p className = {"rank-stamp" + (this.state.numGames < 40? '-disabled' : '')} > [40_Missions_Completed] </p> </div>
                </td>
              </tr>
              <tr>
                <td colSpan = "4">
                  <h5 style= {{"color":"#0e2930", "fontFamily":"handwriting",'fontSize': '40px'}}> You have completed {this.state.numGames} missions! Keep it up! </h5>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Completed Mission diseases */}
        <div className = "missions">
          <h1 style = {{"fontSize":"100px","color":"#0e2930", "fontFamily":"Stella"}}> Mission Accomplished!</h1>
          {/*tables holding p*/}
          <div className="mission-table">
          <Table borderless size="sm">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
            <tr>
            {this.state.completedQuiz.map(data => {
              return (
                <td className = "images">
                <div className = "images">
                <div className = "circle" >
                 <img src={virusIcon} style={data.icon == 'virusIcon' ? {} : { display: 'none' }} className = "disease"/>
                 <img src={bacteriaIcon} style={data.icon == 'bacteriaIcon' ? {} : { display: 'none' }} className = "disease"/>
                 <img src={fungusIcon} style={data.icon == 'fungusIcon' ? {} : { display: 'none' }} className = "disease"/>
                 <img src={parasiteIcon} style={data.icon == 'parasiteIcon' ? {} : { display: 'none' }} className = "disease"/>
                 </div>
                </div>
                </td>
              );
            })}
            </tr>
            <tr>
            {this.state.completedQuiz.map(data => {
              return (
                <td><div className = "images"><img src={star} className = "star"/><img src={star} style={data.score >= 3 ? {} : { display: 'none' }} className = "star1"/><img src={star} style={data.score >= 5 ? {} : { display: 'none' }} className = "star2"/></div></td>
              );
            })}
            </tr>
            <tr>
            {this.state.completedQuiz.map(data => {
              return (
                <td><div className = "images">
                <Link to={"/Info/" + this.toTitleCase(data.quiz)}>
                <button className = "disease-button" type="button"> {data.quiz} </button>
                </Link>
                </div></td>
              );
            })}
            </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default mainLayout(Profile);
