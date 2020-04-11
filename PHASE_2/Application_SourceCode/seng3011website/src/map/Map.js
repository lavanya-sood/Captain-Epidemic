import React, { Component } from 'react'
import mainLayout from '../MainLayout.js';
import '../css/Map.css';
import LeafletMap from './Leaflet.js';
import mapicon from '../img/map.png';

class MapContainer extends Component<{}, State> {
    state = {
        lat: -33.865143,
        lng: 151.209900,
    }
    render() {
    return (
        <div>
        <Header />
        <LeafletMap data={this.state}/>
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

export default mainLayout(MapContainer);