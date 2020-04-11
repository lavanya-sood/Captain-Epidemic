import React, { Component } from 'react'
import mainLayout from '../MainLayout.js';
import '../css/Map.css';
import { geolocated } from "react-geolocated";
import LeafletMap from './Leaflet.js';
import mapicon from '../img/map.png';

class MapContainer extends Component<{}, State> {
  render() {
    return (
        <div>
        <Header />
        <LeafletMap />
        </div>
    );
  }
}

class Header extends Component {
    render() {
        return (
            <div> 
                <img className = "map-icon" src={mapicon} alt=""></img>
                <h2 className="headingpage map-title">Global Disease Map</h2>
            </div>
        );
    }
}

export default mainLayout(geolocated({
    positionOptions: {
        enableHighAccuracyy: false,
    },
    userDecisionTimeout: 5000,
})(MapContainer));