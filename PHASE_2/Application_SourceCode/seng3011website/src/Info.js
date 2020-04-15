import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";
import Table from 'react-bootstrap/Table'
import './css/Info.css';
import { Link } from "react-router-dom";

import mainLayout from './MainLayout';
import virus from './img/virus.png';

import soreThroat from './img/sore-throat.png';
import fever from './img/fever.png';
import headache from './img/headache.png';
import cough from './img/cough.png';

import hand from './img/hand-wash.png';
import touch from './img/do-not-touch.png';
import mask from './img/medical-mask.png';
import distance from './img/distance.png';

import australia from './img/australia.png';
import china from './img/china.png';
import italy from './img/italy.png';
import uk from './img/uk.png';
import germany from './img/germany.png';
import spain from './img/spain.png';


class Info extends Component {

  static get CONTAINER_STYLE() {
     return {
       position: "relative",
       height: "100vh",
       width: "100%",
       display: "flex",
       flex: 1,
       justifyContent: "center",
       alignItems: "middle",
       marginTop: "0px"
     };
   }

   static get CARD_STYLE1() {
     return {
       height: "500px",
       width: "800px",
       paddingTop: "80px",
       textAlign: "center",
       background: "#7CDBD5",
       color: "#FFF",
       fontFamily: "sans-serif",
       fontSize: "12px",
       borderRadius: "10px",
       boxSizing: "border-box",

     };
   }

   static get CARD_STYLE2() {
     return {
       height: "500px",
       width: "800px",
       paddingTop: "80px",
       textAlign: "center",
       background: "#F9BE02",
       color: "#FFF",
       fontFamily: "sans-serif",
       fontSize: "12px",
       borderRadius: "10px",
       boxSizing: "border-box",
     };
   }

   static get CARD_STYLE3() {
     return {
       height: "500px",
       width: "800px",
       paddingTop: "80px",
       textAlign: "center",
       background: "#F53240",
       color: "#FFF",
       fontFamily: "sans-serif",
       fontSize: "12px",
       borderRadius: "10px",
       boxSizing: "border-box"
     };
   }
   static get CARD_STYLE4() {
     return {
       height: "500px",
       width: "800px",
       paddingTop: "80px",
       textAlign: "center",
       background: "#1e4b57",
       color: "#FFF",
       fontFamily: "sans-serif",
       fontSize: "12px",
       borderRadius: "10px",
       boxSizing: "border-box"
     };
   }
   static get CARD_STYLE5() {
     return {
       height: "500px",
       width: "800px",
       paddingTop: "80px",
       textAlign: "center",
       background: "#37836f",
       color: "#FFF",
       fontFamily: "sans-serif",
       fontSize: "12px",
       borderRadius: "10px",
       boxSizing: "border-box"
     };
   }

  render() {
    return (
      <div>
        <div className="letter">
          {/* Confidential Heading */}
          <h1 className = "confidential">[CONFIDENTIAL]</h1>
          {/* Disease (animate) + Name + Button */}
          <div className = "disease">
            <img src={virus} align = "left" className="virus-image" alt=""/>
            <h1 className = "virus-title" align = "center"> Coronavirus </h1>
            <Link to="/Quiz" style={{ textDecoration: 'none' }}><button className = "quiz-button" type="button" value="Quiz"><span> Beat the Quiz! </span></button></Link>
          </div>
          {/*Symptoms*/}
          <div className = "symptoms">
            <h1 className = "symptoms-title"> Symptoms </h1>
            <br />
            <Table borderless size="sm" className = "symptoms-table">
            <tbody>
            <tr>
              <td><img src={fever} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> Fever </p></td>
            </tr>
            <tr>
              <td><img src={cough} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> Dry Coughs </p></td>
            </tr>
            <tr>
              <td><img src={headache} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> Headache </p></td>
            </tr>
            <tr>
              <td><img src={soreThroat} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> Sore Throat </p></td>
            </tr>
            </tbody>
            </Table>
          </div>
          {/*graph*/}
          <div className="box">
          <div className = "graph">
          <div className = "dec"><p className = "bar-text">44</p></div>
          <div className = "jan"><p className = "bar-text">9 826</p></div>
          <div className = "feb"><p className = "bar-text">85 403</p></div>
          <div className = "mar"><p className = "bar-text">750 890</p></div>
          <div className = "apr"><p className = "bar-text">972 303</p></div>
          </div>
          <div className = "graph-table">
          <p className = "graph-text">Dec19</p>
        <p className = "graph-text">Jan20</p>

      <p className = "graph-text">Feb20</p>
        <p className = "graph-text">Mar20</p>
          <p className = "graph-text">Apr20</p>
          </div>
          </div>
        </div>

        {/**/}
        <div className = "missions1">
          <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella"}}> Affected Countries</h1>
          {/*tables holding p*/}
          <div className="mission1-table">
          <Table borderless size="sm">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className = "circle1"><img src={australia} className = "disease1"/></div></td>

                <td><div className = "circle1"><img src={china} className = "disease1"/></div></td>

                <td><div className = "circle1"><img src={italy} className = "disease1"/></div></td>

                <td><div className = "circle1"><img src={germany} className = "disease1"/></div></td>

                <td><div className = "circle1"><img src={uk} className = "disease1"/></div></td>

                <td><div className = "circle1"><img src={spain} className = "disease1"/></div></td>
              </tr>


              <tr>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> Australia </button></Link></div>
                </td>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> China </button></Link></div>
                </td>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> Italy </button></Link></div>
                </td>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> Germany </button></Link></div>
                </td>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> UK </button></Link></div>
                </td>
                <td><div className = "back"><Link to="/Location"><button className = "disease1-button" type="button" value="Edit"> Spain </button></Link></div>
                </td>
              </tr>

            </tbody>
          </Table>
          </div>
        </div>

        {/**/}
        <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella", "margin" : "70px 0px 0px 0px"}}> Latest News Reports</h1>

        <div style={Info.CONTAINER_STYLE}>
           <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
             <div style={Info.CARD_STYLE2}>
              <h1 className = "report-title"> Pandemic Update </h1>
              <p className = "report-date"> 11 March 2020 </p>
              <p className = "report-para">Speaking at the COVID-19 media briefing, the WHO Director-General said:
"WHO has been assessing this outbreak around the clock and we are deeply concerned both by the alarming levels of spread and severity, and by the alarming levels of inaction.
We have therefore made the assessment that COVID-19 can be characterized as a pandemic.</p>
              <a href = "https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020" ><button className = "report-button1" type="button"> Read More </button></a>
             </div>
             <div style={Info.CARD_STYLE1}>
             <h1 className = "report-title"> Korea Update</h1>
             <p className = "report-date"> 21 January 2020 </p>
             <p className = "report-para">On 20 January 2020, National IHR Focal Point (NFP) for Republic of Korea reported the first case of novel coronavirus in the Republic of Korea. The case is a 35-year-old female, Chinese national, residing in Wuhan, Hubei province in China.</p>
              <a href = "https://www.who.int/csr/don/21-january-2020-novel-coronavirus-republic-of-korea-ex-china/en/" ><button className = "report-button2" type="button"> Read More </button></a>
             </div>
             <div style={Info.CARD_STYLE3}>
             <h1 className = "report-title"> Japan Update</h1>
             <p className = "report-date"> 17 January 2020 </p>
             <p className = "report-para">On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China.</p>
              <a href = "https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/" ><button className = "report-button3" type="button"> Read More </button></a>
             </div>
             <div style={Info.CARD_STYLE4}>
             <h1 className = "report-title"> Japan Update</h1>
             <p className = "report-date"> 16 January 2020 </p>
             <p className = "report-para">The Japanese Ministry of Health, Labour and Welfare, today informed the World Health Organization (WHO) of a confirmed case of a novel coronavirus (2019-nCoV) in a person who travelled to Wuhan, China. This is the second confirmed case of 2019-nCoV that has been detected outside of China, following confirmation of a case in Thailand on 13 January.</p>
             <a href = "https://www.who.int/csr/don/16-january-2020-novel-coronavirus-japan-ex-china/en/" ><button className = "report-button4" type="button"> Read More </button></a>
             </div>
             <div style={Info.CARD_STYLE5}>
             <h1 className = "report-title"> Thailand Update</h1>
             <p className = "report-date"> 14 January 2020 </p>
             <p className = "report-para">On 13 January 2020, the Ministry of Public Health (MoPH), Thailand reported the first imported case of lab-confirmed novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China.</p>
             <a href = "https://www.who.int/csr/don/14-january-2020-novel-coronavirus-thailand/en/" ><button className = "report-button5" type="button"> Read More </button></a>
             </div>
           </ReactCardCarousel>
         </div>

         {/**/}

         <div className = "prevention">
           <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella"}}> Prevention Tips</h1>
           {/*tables holding p*/}
           <div className="prevention-table">
           <Table borderless size="sm">
             <thead>
               <tr>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td><div className = "circle-prevention"><img src={hand} className = "prevention-img"/></div></td>
                 <td width = "420px"><p className = "prevention-text">Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub</p></td>
                 <td><div className = "circle-prevention"><img src={mask} className = "prevention-img"/></div></td>
                 <td ><p className = "prevention-text">Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze</p></td>
               </tr>
               <tr>
                 <td><div className = "circle-prevention"><img src={distance} className = "prevention-img"/></div></td>
                 <td><p className = "prevention-text">Stay home and self-isolate from others in the household if you feel unwell</p></td>
                 <td><div className = "circle-prevention"><img src={touch} className = "prevention-img"/></div></td>
                 <td><p className = "prevention-text">Don't touch your eyes, nose, or mouth if your hands are not clean</p></td>
               </tr>

             </tbody>
           </Table>
           </div>
           </div>
    </div>
    );
  }
}



export default mainLayout(Info);
