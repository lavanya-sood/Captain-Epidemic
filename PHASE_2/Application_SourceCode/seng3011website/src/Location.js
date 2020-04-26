import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";
import Table from 'react-bootstrap/Table'
import './css/Location.css';
import { Link, Redirect } from "react-router-dom";

import mainLayout from './MainLayout';

import virus from './img/virus.png';
import virus1 from './img/virus1.png';
import virus2 from './img/virus2.png';
import virus3 from './img/virus3.png';
import virus4 from './img/germ.png'

//import ausMap from './img/aus-map.png';

import countries from './map/Countries.js'
import LeafletMap from './map/Leaflet';
import mapicon from './img/map.png';

function getCountryCoordinates(country) {
  for (var i = 0; i < countries[0].features.length; i++) {
      if (countries[0].features[i].properties.name.indexOf(country) !== -1) {
          if (countries[0].features[i].geometry.type === 'Polygon') {
              return countries[0].features[i].geometry.coordinates
          } else {
              var area = require('area-polygon')
              var max = 0
              var max_j = 0
              for (var j = 0; j < countries[0].features[i].geometry.coordinates.length; j++) {
                  var a  = area(countries[0].features[i].geometry.coordinates[j][0])
                  if (a > max) {
                      max = a
                      max_j = j
                  }
              }
              return countries[0].features[i].geometry.coordinates[max_j]
          }
      }
  }
}

function getCentre(country) {
  var polylabel = require("polylabel")
  if (country === 'Brunei Darussalam') {
    country = 'Brunei'
  }
  if (country === 'Timor-Leste') {
    country = 'Timor'
  }
  if (country === 'Taiwan, Province of China') {
    country = 'Taiwan'
  }
  if (country === 'Russian Federation') {
    country = 'Russia'
  }
  if (country === "Lao People's Democratic Republic") {
    country = 'Lao'
  }
  if (country === 'Syrian Arab Republic') {
    country = 'Syria'
  }
  if (country === 'Iran, Islamic Republic of') {
    country = 'Iran'
  }
  if (country === 'Dominica') {
    return [-61.5510, 16.2650]
  }
  var polygon = getCountryCoordinates(country)
  if (polygon === undefined) {
    if (country === 'American Samoa') {
      return [-170.700049, -14.292553]
    }
    if (country === 'Andorra') {
      return [1.521801, 42.506287]
    }
    if (country === 'Anguilla') {
      return [-63.068615, 18.220554]
    }
    if (country === 'Antigua and Barbuda') {
      return [-61.796429, 17.060816]
    }
    if (country === 'Aruba') {
      return [-69.968338, 12.521110]
    }
    if (country === 'Bahrain') {
      return [50.400505, 26.156258]
    }
    if (country === 'Barbados') {
      return [-59.543198, 13.193887]
    }
    if (country === 'Comoros') {
      return [44.322191, -12.075001]
    }
    if (country === 'Curaçao') {
      return [-69, 12.1833326]
    }
    if (country === "Côte d'Ivoire"){
      return [-5.5471, 7.5400]
    }
    if (country === 'French Polynesia') {
      return [-149.4068, -17.6797]
    }
    if (country === 'Guadeloupe') {
      return [-61.5510, 16.2650]
    }
    if (country === 'Hong Kong') {
      return [114.1694, 22.3193]
    }
    if (country === 'Macao') {
      return [113.5439, 22.1987]
    }
    if (country === 'Maldives') {
      return [73.2207, 3.2028]
    }
    if (country === 'Mauritius') {
      return [57.5522, -20.3484]
    }
    if (country === 'Mayotte') {
      return [45.166, -12.8275]
    }
    if (country === 'Réunion') {
      return [55.5364, -21.1151]
    }
    if (country === 'Saint Kitts and Nevis') {
      return [-62.7830, 17.3578]
    }
    if (country === 'Saint Lucia') {
      return [-60.9789, 13.9094]
    }
    if (country === 'Saint Vincent and the Grenadines') {
      return [-61.2872, 12.9843]
    }
    if (country === 'Samoa') {
      return [-172.1046, -13.7590]
    }
    if (country === 'Sao Tome and Principe') {
      return [6.6131, 0.1864]
    }
    if (country === 'Seychelles') {
      return [55.4920, 4.6796]
    }
    if (country === 'Singapore') {
      return [103.8198, 1.3521]
    }
    if (country === 'Tonga') {
      return [103.8198, 1.3521]
    }
  }
  if (polygon === undefined) {
    return undefined
  }
  var p = polylabel(polygon, 0.001)
  return p
}

function getZoom(country) {
  if (country === 'American Samoa' || country === 'Anguilla' || country === 'Antigua and Barbuda') {
    return 11
  }
  if (country === 'Samoa' || country === 'French Polynesia' || country === 'Curaçao' || country === 'Comoros' || country === 'Barbados' || country === 'Aruba' || country === 'Bahrain') {
    return 9
  }
  if (country === 'Malta' || country === 'Fiji' || country === 'Equatorial Guinea' || country === 'El Salvador' || country === 'Djibouti' || country === 'Cyprus'|| country === 'Brunei Darussalam' || country === 'Bahamas') {
    return 8
  }
  if (country === 'Trinidad and Tobago' || country === 'Rwanda' || country === 'Qatar' || country === 'Puerto Rico' || country === 'Luxembourg' || country === 'Lesotho' || country === 'Kuwait' || country === 'Jamaica' || country === 'Haiti' || country === 'Guadeloupe' || country === 'Dominica'|| country === 'Cambodia' || country === 'Burundi') {
    return 7
  }
  if (country === 'Taiwan, Province of China' || country === 'Sri Lanka' || country === 'Slovenia' || country === 'Serbia' || country === 'Panama' || country === 'Netherlands' || country === 'Montenegro' || country === 'Malawi' || country === 'Macao' || country === 'Lithuania' || country === 'Lebanon' || country === 'Kyrgyzstan' || country === 'Jordan' || country === 'Israel' || country === 'Hungary' || country === 'Honduras' || country === 'Guyana' || country === 'Guinea' || country === 'Guatemala' || country === 'Greece' || country === 'Georgia' || country === 'Gabon'|| country === 'French Guiana' || country === 'Estonia' || country === 'Dominican Republic'|| country === "Côte d'Ivoire" || country === 'Costa Rica' || country === 'Burkina Faso' || country === 'Bulgaria' || country === 'Bosnia and Herzegovina' || country === 'Bhutan' || country === 'Benin' || country === 'Belize' || country === 'Albania' || country === 'Armenia' || country === 'Azerbaijan') {
    return 6
  }
  if (country === 'Vietnam' || country === 'Uruguay' || country === 'United Arab Emirates' || country === 'Uganda' || country === 'Togo' || country === 'Tajikistan' || country === 'Syrian Arab Republic' || country === 'Switzerland' || country === 'Solomon Islands' || country === 'Slovakia' || country === 'Sierra Leone' || country === 'Portugal' || country === 'Philippines' || country === 'Nicaragua' || country === 'Nepal' || country === 'Mozambique' || country === 'Liberia' || country === 'Latvia' || country === "Lao People's Democratic Republic" || country === 'Ireland' || country === 'Ghana' || country === 'Denmark'|| country === 'Cuba' || country === 'Central African Republic' || country === 'Belarus' ||country === 'Bangladesh') {
    return 5
  }
  if (country === 'Russian Federation' || country === 'Finland'|| country === 'China' || country === 'Canada') {
    return 3
  }
  return 4
}

class Location extends Component {
  state = {
    country: '',
    lat: '',
    lng: '',
    zoom: '',
    min: '',
    max: '',
    drag: false,
    class: 'map-image',
    diseases_tele: '',
    diseases_calm: '',
    report_tele: '',
    report_calm:'',
    countries:''
  }
  callAPI(country) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country })
  };
    fetch("/location/diseases-teletubbies", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ diseases_tele: res }));
    fetch("/location/diseases-calmclams", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ diseases_calm: res }));
    fetch("/location/reports-teletubbies", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ report_tele: res }));
    fetch("/location/reports-calmclams", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ report_calm: res }));
    fetch("/location/countries", requestOptions)
        .then(res => res.json())
        .then(res => this.setState({ countries: res }))
  }
  componentDidMount() {
    const path = window.location.hash
    var country = path.split('/')[2]
    if (country === undefined) {
      this.setState({countries: false})
      return
    }
    country = country.replace(/%20/g, ' ')
    this.callAPI(country)
    if (getCentre(country) === undefined) {
      this.setState({countries: false})
      return
    }
    this.setState({
      country: country,
      lat: getCentre(country)[1],
      lng: getCentre(country)[0],
      zoom: getZoom(country),
      min: getZoom(country),
      max: getZoom(country),
    })
  }
  getDiseases(dis1, dis2) {
    dis1 = this.state.diseases_calm
    dis2 = this.state.diseases_tele
    var diseases = []
    for (var i = 0; i < dis1.length; i++) {
      diseases.push(dis1[i].disease)
    }
    for (i = 0; i < dis2.length; i++) {
      diseases.push(dis2[i].disease)
    }
    diseases = Array.from(new Set(diseases))
    var result = []
    for (i = 0; i < diseases.length; i++) {
      var tmp = {
        disease: diseases[i],
        location: '',
        type: ''
      }
      result.push(tmp)
    }
    for (i = 0; i < dis1.length; i++) {
      for (var j = 0; j < result.length; j++) {
        if (dis1[i].disease === result[j].disease) {
          result[j].location += dis1[i].location
          result[j].type = dis1[i].type
        }
      }
    }
    for (i = 0; i < dis2.length; i++) {
      for (j = 0; j < result.length; j++) {
        if (dis2[i].disease === result[j].disease) {
          if (result[j].location === '') {
            result[j].location += dis2[i].location
          } else {
            result[j].location += ',' + dis2[i].location
          }

          result[j].type = dis2[i].type
        }
      }
    }
    for (j = 0; j < result.length; j++) {
      var loc = result[j].location.split(',')
      loc = Array.from(new Set(loc))
      if (loc.length > 4) {
        result[j].location = 'See map for disease spread!'
      } else {
        result[j].location = loc.toString()
      }
      result[j].disease = diseases[j].charAt(0).toUpperCase() + diseases[j].slice(1)
    }
    return result
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
    if (this.state.countries === false) {
      return <Redirect to="/*" />
    }
    if (this.state.country === '' || this.state.diseases_tele === '' || this.state.diseases_calm === '' || this.state.report_calm === '' || this.state.report_tele === '') {
        return <h3 className="headingpage loading">Loading...</h3>
    }
    const getDis = this.getDiseases()
    const diseases = getDis.map(({disease, location, type}) => {
      var href = '/Info/' + disease
      if (type === 'virusIcon')
            return (
              <tr>
                <td width = "100px"><div className = "circle-prevention1"><img src={virus} className = "prevention-img1"/></div></td>
                <td><Link to={href}><button className = "disease-button2" type="button" value="Edit"> {disease} </button></Link>
                  <br />
                  <h3 className = "country-para">{location}</h3></td>
              </tr>
            )
        if (type === 'bacteriaIcon')
            return (
              <tr>
                <td width = "100px"><div className = "circle-prevention1"><img src={virus1} className = "prevention-img1"/></div></td>
                <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> {disease} </button></Link>
                  <br />
                  <h3 className = "country-para">{location}</h3></td>
              </tr>
            )
        if (type === 'fungusIcon')
            return (
              <tr>
                <td width = "100px"><div className = "circle-prevention1"><img src={virus2} className = "prevention-img1"/></div></td>
                <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> {disease} </button></Link>
                  <br />
                  <h3 className = "country-para">{location}</h3></td>
              </tr>
            )
        if (type === 'parasiteIcon')
        return (
          <tr>
            <td width = "100px"><div className = "circle-prevention1"><img src={virus3} className = "prevention-img1"/></div></td>
            <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> {disease} </button></Link>
              <br />
              <h3 className = "country-para">{location}</h3></td>
          </tr>
          )
        return (
          <tr>
            <td width = "100px"><div className = "circle-prevention1"><img src={virus4} className = "prevention-img1"/></div></td>
            <td><Link to="/Info"><button className = "disease-button2" type="button" value="Edit"> {disease} </button></Link>
              <br />
              <h3 className = "country-para">{location}</h3></td>
          </tr>
        )
    })
    const reportData = this.getReports()
    const reports = reportData.map(({url, headline, maintext, date, key}) => {
      if (key === 1)
        return (
          <div style={Location.CARD_STYLE2}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button1" type="button"> Read More </button></a>
          </div>
        )
      if (key === 2)
        return (
          <div style={Location.CARD_STYLE1}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button2" type="button"> Read More </button></a>
          </div>
        )
      if (key === 3)
        return (
          <div style={Location.CARD_STYLE3}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button3" type="button"> Read More </button></a>
          </div>
        )
      if (key === 4)
        return (
          <div style={Location.CARD_STYLE4}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button4" type="button"> Read More </button></a>
          </div>
        )
      return (
        <div style={Location.CARD_STYLE5}>
            <h1 className = "report-title"> {headline}</h1>
            <p className = "report-date">{date}</p>
            <p className = "report-para">{maintext}</p>
            <a href = {url} ><button className = "report-button5" type="button"> Read More </button></a>
          </div>
      )
    })
    return (
      <div>

      <h1 className = "country-title" align = "center"> {this.state.country} </h1>
      <h1 className = "confidential">[TOP_SECRET_FILE]</h1>

      <div>
      <div className = "country-info">
      <div  className = "separator-loc"> RECENT EPIDEMICS IN THIS COUNTRY </div>
      <Table borderless size="sm" className = "country-dis-table">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {diseases}

        </tbody>
      </Table>
      <h3 style={diseases.length == 0 ? {} : { display: 'none' }} className = "error-msg-reports1"> No diseases in the past year.</h3>
      </div>

      <div className = "passport1">
        <LeafletMap className='map-country' data={this.state}/>
      </div>
      <a href='#/map'><img className = "map-icon-location" src={mapicon} alt=""></img></a>
      </div>

      <div className = "missions2">
      <h1 style = {{"font-size":"100px","color":"#0e2930", "font-family":"Stella", "margin" : "70px 0px 0px 0px", "display": "block"}}> Latest News Reports</h1>
      </div>

      <div style={reports.length == 0 ? { display: 'none' } : {} }><div style={Location.CONTAINER_STYLE}>
         <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
           {reports}
         </ReactCardCarousel>
       </div>
       </div>
       <h3 style={reports.length == 0 ? {} : { display: 'none' }} className = "error-msg-reports"> There have been no reports in the past year.</h3>

      </div>
    );
  }
}



export default mainLayout(Location);
