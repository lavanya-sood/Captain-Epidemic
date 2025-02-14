import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";
import Table from 'react-bootstrap/Table'
import './css/Info.css';
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from 'axios';
import mainLayout from './MainLayout';
import virusIcon from './img/virusIcon.png';
import bacteriaIcon from './img/bacteriaIcon.png';
import fungusIcon from './img/fungusIcon.png';
import parasiteIcon from './img/parasiteIcon.png';
import germIcon from './img/germIcon.png';

import soreThroat from './img/sore-throat.png';
import fever from './img/fever.png';
import headache from './img/headache.png';
import cough from './img/cough.png';

import hand from './img/hand-wash.png';
import touch from './img/do-not-touch.png';
import mask from './img/medical-mask.png';
import distance from './img/distance.png';

import { diseases } from "./category/DiseaseData";

import australia from './img/australia.png';
import china from './img/china.png';
import italy from './img/italy.png';
import uk from './img/uk.png';
import germany from './img/germany.png';
import spain from './img/spain.png';

function checkDiseases(disease) {
  console.log(disease)
  var match = disease.split(' ')
  for (var i = 0; i < diseases.length; i++) {
    if (diseases[i].title) {
      if (disease.toLowerCase() === diseases[i].title.toLowerCase()) {
        return true
      }
    } else {
      if (disease.toLowerCase() === diseases[i].name.toLowerCase()) {
        return true
      }
    }
  }
  return false
}

class Info extends Component {
  state = {
    disease: '',
    check: '',
    syndromes:'',
    icon : '',
    countries: '',
    codes:'',
    report_tele: '',
    report_calm:'',
    vaccine: '',
    prevention: '',
    source : ''
  }
  //rmb game played
  setGameDisease = (e) => {
    localStorage.setItem('game-disease', e.target.id);
  };

  callDiseaseAPI(disease) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disease: disease })
    };
    fetch("/map/diseases", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ check: res }))
  }

  callAPI(disease) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disease: disease })
    };
    fetch("/map/info", requestOptions)
        .then(res => res.json())

      }
      callSympAPI(disease){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ disease: disease })
        };
    fetch("/map/symptoms")
    .then(res => res.json())
      .then(res => {
        this.setState({ icon : res[0]})
        localStorage.setItem('game-icon',this.state.icon)
      })

      fetch("/map/symptoms")
      .then(res => res.json())
        .then(res => this.setState({ syndromes : res.slice(1,)}))

      fetch("/map/countriesdisease2")
        .then(res => res.json())
        .then(res => this.setState({ countries : res}))

        fetch("/map/countriesdisease")
          .then(res => res.json())
          .then(res => this.setState({ codes : res}))

          fetch("/location/reports-teletubbies-d", requestOptions)
              .then(res => res.json())
              .then(res => this.setState({ report_tele: res }))
              .then(res => console.log(this.state.report_tele));
          fetch("/location/reports-calmclams-d", requestOptions)
              .then(res => res.json())
              .then(res => this.setState({ report_calm: res }));
          fetch("/map/prevention")
                  .then(res => res.json())
                  .then(res => this.setState({ prevention: res}))
                  fetch("/map/source")
                          .then(res => res.json())
                          .then(res => this.setState({ source: res}))
                  fetch("/map/vaccine")
                          .then(res => res.json())
                          .then(res => this.setState({ vaccine: res}))
                          .then(res => console.log(this.state.vaccine))





  }

  componentDidMount() {
    const path = window.location.hash
    var disease = path.split('/')[2]
    if (path.split('/').length > 3) {
      disease = path.split('/')[2] + '/' + path.split('/')[3]
    }
    if (disease === undefined) {
      this.setState({check: false})
      return
    }
    disease = disease.replace(/%20/g, ' ')
    if (!checkDiseases(disease)) {
      this.setState({check: false})
      return
    }
    this.callAPI(disease)
    this.callDiseaseAPI(disease)
    this.callSympAPI(disease)
    //Promise.all(this.callAPI(disease)).then(() => this.callDiseaseAPI(disease)).then(this.callSympAPI(disease))
    this.setState({
      disease: disease
    })
  }

  getReports() {
    var reports = this.state.report_calm.concat(this.state.report_tele)
    for (var i = 0; i < reports.length; i++) {
      reports[i].key = i%5 + 1
    }
    return reports
  }
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
       height: "600px",
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
       height: "600px",
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
       height: "600px",
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
       height: "600px",
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
       height: "600px",
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
    if (this.state.check === false) {
      return <Redirect to="/*" />
    }
    if (this.state.report_calm === '' || this.state.report_tele === '') {
        return <h3 className="headingpage loading">Loading...</h3>
    }
    const getImage = () => {
      if (this.state.icon == "virusIcon"){
        return  <img src={virusIcon} align = "left" className="virus-image" alt=""/>
      }
      if (this.state.icon == "bacteriaIcon"){
        return  <img src={bacteriaIcon} align = "left" className="virus-image" alt=""/>
      }
      if (this.state.icon == "fungusIcon"){
        return  <img src={fungusIcon} align = "left" className="virus-image" alt=""/>
      }
      if (this.state.icon == "parasiteIcon"){
        return  <img src={parasiteIcon} align = "left" className="virus-image" alt=""/>
      }
      if (this.state.icon == "germIcon"){
        return  <img src={germIcon} align = "left" className="virus-image" alt=""/>
      }
    }

    const reportData = this.getReports()
    const reports = reportData.map(({url, headline, maintext, date, key}) => {
      if (key === 1)
        return (
          <div style={Info.CARD_STYLE2}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button1" type="button"> Read More </button></a>
          </div>
        )
      if (key === 2)
        return (
          <div style={Info.CARD_STYLE1}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button2" type="button"> Read More </button></a>
          </div>
        )
      if (key === 3)
        return (
          <div style={Info.CARD_STYLE3}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button3" type="button"> Read More </button></a>
          </div>
        )
      if (key === 4)
        return (
          <div style={Info.CARD_STYLE4}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button4" type="button"> Read More </button></a>
          </div>
        )
      return (
        <div style={Info.CARD_STYLE5}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button5" type="button"> Read More </button></a>
          </div>
      )
    })
    return (
      <div>
        <div className="letter">
          {/* Confidential Heading */}
          <h1 className = "confidential">[CONFIDENTIAL]</h1>
          {/* Disease (animate) + Name + Button */}
          <div className = "disease">
            <img src={virusIcon} style={this.state.icon == 'virusIcon' ? {} : { display: 'none' }} align = "left" className="virus-image" alt=""/>
            <img src={bacteriaIcon} style={this.state.icon == 'bacteriaIcon' ? {} : { display: 'none' }} align = "left" className="virus-image" alt=""/>
            <img src={fungusIcon} style={this.state.icon == 'fungusIcon' ? {} : { display: 'none' }} align = "left" className="virus-image" alt=""/>
            <img src={parasiteIcon} style={this.state.icon == 'parasiteIcon' ? {} : { display: 'none' }} align = "left" className="virus-image" alt=""/>
            <img src={germIcon} style={this.state.icon == 'germIcon' ? {} : { display: 'none' }} align = "left" className="virus-image" alt=""/>
            <h1 className = "virus-title" align = "center" style = {this.state.disease.length > 11 ? {fontSize : '70px'}:{fontSize : '70px'}}> {this.state.disease} </h1>
            <Link to= {this.state.disease.toLowerCase() == "coronavirus" ? "/Quiz" : "/Hangman"} style={{ textDecoration: 'none' }}>
            <Button className = "quiz-button" id = {this.state.disease.toLowerCase()} onClick={(e) => this.setGameDisease(e)} >
            Beat the Quiz!
            </Button>
            </Link>
          </div>
          {/*Symptoms*/}
          <div className = "symptoms">
            <h1 className = "symptoms-title"> Symptoms </h1>
            <br />
            <p className = "symptoms-error" style = {this.state.syndromes.length == 0 ? {} : {display: 'none'}}>No known symptoms</p>
            <Table borderless size="sm" className = "symptoms-table">
            <tbody>
            <tr> {/*switching pictures means: if syndrome = ... src = ...*/}
              <td className = "symptom-td"><img style={this.state.syndromes.length > 0 ? {} : { display: 'none' }} src={fever} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> {this.state.syndromes[0]} </p>
</td>
            </tr>
            <tr>
              <td><img style={this.state.syndromes.length > 1 ? {} : { display: 'none' }}  src={cough} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> {this.state.syndromes[1]} </p></td>
            </tr>
            <tr>
              <td><img style={this.state.syndromes.length > 2 ? {} : { display: 'none' }}  src={headache} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> {this.state.syndromes[2]} </p></td>
            </tr>
            <tr>
              <td><img style={this.state.syndromes.length > 3 ? {} : { display: 'none' }}  src={soreThroat} align = "left" className="symptom-image" alt=""/><p className = "symptom-text"> {this.state.syndromes[3]} </p></td>
            </tr>
            </tbody>
            </Table>
          </div>
          {/*graph cases last 5 case reports otherwise dictionary meanings of virus etc  */}
          < div style={this.state.disease == "Coronavirus" ? {} : { display: 'none' }} className="box">
          <div className = "graph">
          <div className = "dec"><p className = "bar-text">262</p></div>
          <div className = "jan"><p className = "bar-text">9 826</p></div>
          <div className = "feb"><p className = "bar-text">85 403</p></div>
          <div className = "mar"><p className = "bar-text">856 955</p></div>
          <div className = "apr"><p className = "bar-text">2 790 986</p></div>
          </div>
          <div className = "graph-table">
          <p className = "graph-text">Dec19</p>
        <p className = "graph-text">Jan20</p>

      <p className = "graph-text">Feb20</p>
        <p className = "graph-text">Mar20</p>
          <p className = "graph-text">Apr20</p>
          </div>
          </div>

        {/*Type information*/}
        < div style={this.state.disease != "Coronavirus" ? {} : { display: 'none' }}>
        <h1 className  = "type-title" style={this.state.icon == "virusIcon" ? {} : { display: 'none' }}> What is a Virus? </h1>
        <h1 className  = "type-title" style={this.state.icon == "bacteriaIcon" ? {} : { display: 'none' }}> What is Bacteria? </h1>
        <h1 className  = "type-title" style={this.state.icon == "fungusIcon" ? {} : { display: 'none' }}> What is Fungus? </h1>
        <h1 className  = "type-title" style={this.state.icon == "parasiteIcon" ? {} : { display: 'none' }}> What is a Parasite? </h1>
        <h1 className  = "type-title" style={this.state.icon == "germIcon" ? {} : { display: 'none' }}> What is a Germ? </h1>

          <p className = "type-info" style={this.state.icon == "virusIcon" ? {} : { display: 'none' }}>A virus (say: VY-rus) is a teensy, tiny germ that can make us sick, but they can't do anything on their own — they need to live inside another creature (their host) to survive. To do that, they have to get into our cells.
            A virus is very sneaky, and just like a robber can break into a bank, a virus can break into a cell.
          </p>
          <p className = "type-info" style={this.state.icon == "bacteriaIcon" ? {} : { display: 'none' }}>Bacteria (say: BAK-teer-ee-uh) are tiny, one-celled creatures that get nutrients from their environments in order to live.
            But not all bacteria are bad. Some bacteria are good for our bodies. Good bacteria live in our intestines and help us use the nutrients in the food we eat and make waste from what's left over.
          </p>
          <p className = "type-info" style={this.state.icon == "fungusIcon" ? {} : { display: 'none' }}>
          Fungi (say: FUN-guy) are multi-celled (made of many cells), plant-like organisms. Unlike other plants, fungi cannot make their own food from soil, water, and air. Instead, fungi get their nutrition from plants, people, and animals. They love to live in damp, warm places, and many fungi are not dangerous in healthy people. An example of something caused by fungi is athlete's foot, that itchy rash that teens and adults sometimes get between their toes.
          </p>
          <p className = "type-info" style={this.state.icon == "parasiteIcon" ? {} : { display: 'none' }}>
          Parasites are plants or animals that live on or in a host getting their nutrients from that host. Sometimes the host is harmed by the parasite, and sometimes the relationship is neutral. When the parasite does have a negative impact on the host, it doesn't often kill the host directly, but the stressors that come with having parasites can kill.
          </p>
          <p className = "type-info" style={this.state.icon == "germIcon" ? {} : { display: 'none' }}>
          When you hear the word ''germ,'' do you think of bugs or dirt? Germs are more like bugs than dirt because they are microorganisms, or tiny living things.  Because they are so small, germs are very tricky. They can secretly invade the human body like an invisible army. Some of these invaders can make you sick, but others help your body function.
          </p>

          <h1 className  = "type-title2"> Transmitted through </h1>
          <h1 className  = "type-title2"> {this.state.source} </h1>

        </div>
        </div>

        {/**/}
        <div className = "missions1">
          <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella"}}> Most Affected Countries</h1>
          {/*tables holding p*/}
          <h3 style={this.state.countries.length == 0 ? {} : { display: 'none' }} className = "error-msg-reports3"> No recorded countries.</h3>
          <div className="mission1-table">
          <Table borderless size="sm">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={this.state.countries.length > 0 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[0]+"/flat/64.png"} className = "disease1"/></div></td>

                <td style={this.state.countries.length > 1 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[1]+"/flat/64.png"} className = "disease1"/></div></td>

                <td style={this.state.countries.length > 2 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[2]+"/flat/64.png"} className = "disease1"/></div></td>

                <td style={this.state.countries.length > 3 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[3]+"/flat/64.png"} className = "disease1"/></div></td>

                <td style={this.state.countries.length > 4 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[4]+"/flat/64.png"} className = "disease1"/></div></td>

                <td style={this.state.countries.length > 5 ? {} : { display: 'none' }}><div className = "circle1"><img src={"https://www.countryflags.io/"+this.state.codes[5]+"/flat/64.png"} className = "disease1"/></div></td>
              </tr>


              <tr>
                <td style={this.state.countries.length > 0 ? {} : { display: 'none' }}><div className = "back0" ><Link to={"/Location/"+this.state.countries[0]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[0]} </button></Link></div>
                </td>
                <td style={this.state.countries.length > 1 ? {} : { display: 'none' }}><div className = "back0" style={this.state.countries.length > 1 ? {} : { display: 'none' }}><Link to={"/Location/"+this.state.countries[1]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[1]} </button></Link></div>
                </td>
                <td style={this.state.countries.length > 2 ? {} : { display: 'none' }}><div className = "back0" ><Link to={"/Location/"+this.state.countries[2]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[2]} </button></Link></div>
                </td>
                <td style={this.state.countries.length > 3 ? {} : { display: 'none' }}><div className = "back0" ><Link to={"/Location/"+this.state.countries[3]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[3]} </button></Link></div>
                </td>
                <td style={this.state.countries.length > 4 ? {} : { display: 'none' }}><div className = "back0" ><Link to={"/Location/"+this.state.countries[4]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[4]} </button></Link></div>
                </td>
                <td style={this.state.countries.length > 5 ? {} : { display: 'none' }}><div className = "back0" ><Link to={"/Location/"+this.state.countries[5]}><button className = "disease12-button" type="button" value="Edit"> {this.state.countries[5]} </button></Link></div>
                </td>
              </tr>

            </tbody>
          </Table>
          </div>
        </div>

        {/**/}
        <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella", "margin" : "70px 0px 0px 0px"}}> Latest News Reports</h1>

        <div style={reports.length == 0 ? { display: 'none' } : {} }><div style={Info.CONTAINER_STYLE}>
           <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
             {reports}
           </ReactCardCarousel>
         </div>
         </div>
         <h3 style={reports.length == 0 ? {} : { display: 'none' }} className = "error-msg-reports"> There have been no reports in the past year.</h3>

         {/**/}

         <div className = "prevention">
           <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella"}}> Prevention Tips</h1>
           {/*tables holding p*/}
           <h3 style={this.state.vaccine == "false" ? {} : { display: 'none' }} className = "error-msg-vac"> This epidemic does not have a vaccine currently.</h3>
           <h3 style={this.state.vaccine == "true" ? {} : { display: 'none' }} className = "error-msg-vac"> This epidemic does have a vaccine.</h3>
           <div className="prevention-table">
           <Table borderless size="sm">
             <thead>
               <tr>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td><div style={this.state.prevention.length > 0 ? {} : { display: 'none' }} className = "circle-prevention"><img src={hand} className = "prevention-img"/></div></td>
                 <td width = "420px"><p className = "prevention-text">{this.state.prevention[0]}</p></td>
                 <td><div style={this.state.prevention.length > 1? {} : { display: 'none' }}className = "circle-prevention"><img src={mask} className = "prevention-img"/></div></td>
                 <td ><p className = "prevention-text">{this.state.prevention[1]}</p></td>
               </tr>
               <tr>
                 <td><div style={this.state.prevention.length > 2? {} : { display: 'none' }}className = "circle-prevention"><img src={distance} className = "prevention-img"/></div></td>
                 <td><p className = "prevention-text">{this.state.prevention[2]}</p></td>
                 <td><div style={this.state.prevention.length > 3 ? {} : { display: 'none' }}className = "circle-prevention"><img src={touch} className = "prevention-img"/></div></td>
                 <td><p className = "prevention-text">{this.state.prevention[3]}</p></td>
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
