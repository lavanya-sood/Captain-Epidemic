import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";
import Table from 'react-bootstrap/Table'
import './css/Location.css';
import { Link } from "react-router-dom";

import mainLayout from './MainLayout';

import virus from './img/virus.png';
import virus1 from './img/virus1.png';
import virus2 from './img/virus2.png';
import virus3 from './img/virus3.png';

import ausMap from './img/aus-map.png';

class Location extends Component {

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

      <h1 className = "country-title" align = "center"> Australia </h1>
      <h1 className = "confidential">[TOP_SECRET_FILE]</h1>

      <div>
      <div className = "country-info">
      <div  className = "separator-loc"> EPIDEMICS IN THIS COUNTRY </div>
      <Table borderless size="sm" className = "country-dis-table">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width = "100px"><div className = "circle-prevention1"><img src={virus} className = "prevention-img1"/></div></td>
            <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> Coronavirus </button></Link>
              <br />
              <h3 className = "country-para">NSW, Victoria</h3></td>
          </tr>
          <tr>
            <td><div className = "circle-prevention1"><img src={virus1} className = "prevention-img1"/></div></td>
            <td ><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> Dengue Fever </button></Link>
            <br />
            <h3 className = "country-para">NSW, Queensland</h3></td>
            </tr>
            <tr>
            <td><div className = "circle-prevention1"><img src={virus2} className = "prevention-img1"/></div></td>
            <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> Hiv/Aids</button></Link>
            <br />
            <h3 className = "country-para">NSW, Victoria</h3></td>
            </tr>
            <tr>
            <td><div className = "circle-prevention1"><img src={virus3} className = "prevention-img1"/></div></td>
            <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> Swine Flu </button></Link>
            <br />
            <h3 className = "country-para">NSW, Northern Territory, Queensland</h3></td>
          </tr>

        </tbody>
      </Table>
      </div>

      <div className = "passport1">
        <img src={ausMap} className = "map-country"/>
      </div>
      </div>

      <div className = "missions2">
      <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella", "margin" : "70px 0px 0px 0px", "display": "block"}}> Latest News Reports</h1>
      </div>

      <div style={Location.CONTAINER_STYLE}>
         <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
           <div style={Location.CARD_STYLE2}>
            <h1 className = "report-title"> Listerosis</h1>
            <p className = "report-date"> 9 April 2018 </p>
            <p className = "report-para">On 2 March 2018, the Australian National Focal Point (NFP) notified WHO of an outbreak of Listeria monocytogenes infection (listeriosis) associated with the consumption of rockmelons (cantaloupe) from a single grower.</p>
            <a href = "https://www.who.int/csr/don/09-april-2018-listeriosis-australia/en/" ><button className = "report-button1" type="button"> Read More </button></a>
           </div>
           <div style={Location.CARD_STYLE1}>
           <h1 className = "report-title"> SARS World Update</h1>
           <p className = "report-date"> 17 April 2003 </p>
           <p className = "report-para">As of today, a cumulative total of 3389 cases with 165 deaths have been reported from twenty five countries. Countries reporting their first probable cases on today’s list include Australia (3) and Mongolia (3).</p>
            <a href = "https://www.who.int/csr/don/2003_04_17/en/" ><button className = "report-button2" type="button"> Read More </button></a>
           </div>
           <div style={Location.CARD_STYLE3}>
           <h1 className = "report-title"> SARS World Update</h1>
           <p className = "report-date"> 9 April 2003 </p>
           <p className = "report-para">New cases were reported in Canada (3), China (1), Hong Kong SAR (42), Singapore (5), and the United States of America (1). The single case reported in Australia has been removed from the list. Deaths were reported in Hong Kong (2) and Singapore (1).</p>
            <a href = "https://www.who.int/csr/don/2003_04_09/en/" ><button className = "report-button3" type="button"> Read More </button></a>
           </div>
           <div style={Location.CARD_STYLE4}>
           <h1 className = "report-title"> Legionnaires Update</h1>
           <p className = "report-date"> 11 May 2000 </p>
           <p className = "report-para">The Human Services Department, Public Health Division of the Government of Victoria, have now confirmed a total of 76 cases, including 2 deaths associated with the Melbourne Aquarium.  All patients contracted their illness between 11 April and 25 April 2000.</p>
           <a href = "https://www.who.int/csr/don/2000_05_11/en/" ><button className = "report-button4" type="button"> Read More </button></a>
           </div>
           <div style={Location.CARD_STYLE5}>
           <h1 className = "report-title"> Legionnaires</h1>
           <p className = "report-date"> 4 May 2000 </p>
           <p className = "report-para">The Human Services Department, Public Health Division of the Government of Victoria, Australia has confirmed sixty-six cases, including 2 deaths. All the patients, with one exception had visited the Melbourne Aquarium after 11 April 2000.</p>
           <a href = "https://www.who.int/csr/don/2000_05_04/en/" ><button className = "report-button5" type="button"> Read More </button></a>
           </div>
         </ReactCardCarousel>
       </div>

      </div>
    );
  }
}



export default mainLayout(Location);
