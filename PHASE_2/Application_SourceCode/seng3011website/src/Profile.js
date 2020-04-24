import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import './css/Profile.css';
import { Link } from "react-router-dom";

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
import virus from './img/virus.png';
import virus1 from './img/virus1.png';
import virus2 from './img/virus2.png';
import virus3 from './img/virus3.png';
import virus4 from './img/virus4.png';
import virus5 from './img/virus5.png';
import mainLayout from './MainLayout';

class Profile extends Component {
  // get data from db
  state = {
    numGames : localStorage.getItem('games'),
    rank : "none",
    username: localStorage.getItem('username'),
    dob: localStorage.getItem('dob'),
    image: localStorage.getItem('image'),
    avatar: false
  }

  componentWillMount() {
    this.state.rank = recruitImg
    if (this.state.numGames == 40){
      this.state.rank = captainImg
    } else if (this.state.numGames >= 30){
      this.state.rank = majorImg
    } else if (this.state.numGames >= 21){
      this.state.rank = commanderImg
    } else if (this.state.numGames >= 15){
      this.state.rank = lieutenantImg
    } else if (this.state.numGames >= 10){
      this.state.rank = sergeantImg
    } else if (this.state.numGames >= 6){
      this.state.rank = corporalImg
    } else if (this.state.numGames >= 3){
      this.state.rank = cadetImg
    }
   }

  getAge(time){
    var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
    var date_array = time.split('-')
    var years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return Math.floor(years_elapsed);
  }

  render() {
    return (
      <div>

        <div className="passport ">
      {/*----PASSPORT---*/}
          <div  className = "separator"> PASSPORT </div>
      {/*Passport icon*/}
          <img src={passportIcon} align = "left" className="passport-image" alt=""/>
      {/*profile pic*/}
          <div className = "images">
            <img src={'./img/'+localStorage.getItem('image')} align = "left" className="profile-image" alt=""/>
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
            <td style = {{"padding" : "0px 0px 0px 0px"}}> <h5 style={{"fontFamily":"handwriting", 'fontSize': '40px'}}>Age: </h5></td>
            <td style = {{"padding" : "0px 0px 0px 0px"}} > <h5 style={{"textDecoration": "underline", "fontFamily":"Chalkduster", "paddingTop":"10px"}}>{this.getAge(this.state.dob)} years old</h5></td>
            </tr>
          </tbody>
          </Table>
      {/*edit: need to link to popup: can only edit password/name*/}
          <div className = "images">
            <button className = "edit-button" type="button" value="Edit"> Edit </button>
          </div>
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
                <td><div className = "circle"><img src={virus} className = "disease"/></div></td>

                <td><div className = "circle"><img src={virus1} className = "disease"/></div></td>

                <td><div className = "circle"><img src={virus2} className = "disease"/></div></td>

                <td><div className = "circle"><img src={virus3} className = "disease"/></div></td>

                <td><div className = "circle"><img src={virus4} className = "disease"/></div></td>

                <td><div className = "circle"><img src={virus5} className = "disease"/></div></td>
              </tr>
              <tr>
                <td><div className = "images"><img src={star} className = "star"/></div>
                </td>
                <td><div className = "images"><img src={star} className = "star"/><img src={star} className = "star1"/></div>
                </td>
                <td><div className = "images"><img src={star} className = "star"/></div>
                </td>
                <td><div className = "images"><img src={star} className = "star"/><img src={star} className = "star1"/></div>
                </td>
                <td><div className = "images"><img src={star} className = "star"/><img src={star} className = "star1"/><img src={star} className = "star2"/></div>
                </td>
                <td><div className = "images"><img src={star} className = "star"/><img src={star} className = "star1"/><img src={star} className = "star2"/></div>
                </td>
              </tr>

              <tr>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> COVID-19 </button></Link></div>
                </td>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> Smallpox </button></Link></div>
                </td>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> Ebola </button></Link></div>
                </td>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> SARS </button></Link></div>
                </td>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> Cholera </button></Link></div>
                </td>
                <td><div className = "images"><Link to="/Info"><button className = "disease-button" type="button" value="Edit"> Dengue </button></Link></div>
                </td>
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