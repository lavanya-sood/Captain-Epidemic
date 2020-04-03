import React, { Component } from 'react'
import { Map, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet'
import '../css/Map.css';
import { geolocated } from "react-geolocated";
import L from 'leaflet';
import countries from './Countries.js'
import { mapResult }from './Maphelper.js'
import { virusIcon, germIcon, bacteriaIcon, parasiteIcon, fungusIcon } from './Icons.js'
import {
        ausBoat,
        foxBoat,
        mooseBoat,
        snakeBoat,
        rhinoBoat,
        rabbitJet,
        parrotJet,
        snowIcon,
        snowFlakeIcon,
        mountainIcon,
        penguinIcon,
        penguinLargeIcon,
        sealIcon, 
        crocodileIcon,
        lobsterIcon,
        starfishIcon,
        fishIcon,
        whaleIcon,
        octopusIcon
        } from './Icons.js';

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#f9be02',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        opacity: 0,
        fillOpacity: 0
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function getTopDiseases(country) {
    var topDiseases = {}
    for (var i = 0; i < mapResult.length; i++) {
        if (mapResult[i].country === country) {
            var name = mapResult[i].name
            if (topDiseases[name]) {
                topDiseases[name]++;
            } else {
                topDiseases[name] = 1;
            }
        }
    }
    var items = Object.keys(topDiseases).map(function(key) {
        return [key, topDiseases[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    items = items.slice(0, 5)
    var result = ''
    for (i = 0; i < items.length; i++) {
        var index = i + 1
        result += '<p>'+ index + '. ' + items[i][0] + '</p>'
    }
    return result

}

class MapContainer extends Component<{}, State> {
    state = {
        lat: -33.865143,
        lng: 151.209900,
        zoom: 3,
        min: 2,
        max: 5,
        markers: mapResult
    }

    getCountries(){
        return countries;
    }

    style(feature) {
        return {
            opacity: 0,
            fillOpacity:0
        }
    }

    onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
        layer.bindPopup('<h6>'+feature.properties.name + ' - Monthly Disease Ranking</h6><p>Make country and diseases clickable to page</p>' + getTopDiseases(feature.properties.name) + '</p>') 
    }

  render() {
    if (this.props.coords) {
        this.setState({
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
        });
    }
    const position = [this.state.lat, this.state.lng]
    const bounds = [[-Infinity, -180],[Infinity, 180]]
    const markers = this.state.markers.map(({lat, lng, type, name, text, date, key}) => {
        if (type === 'virusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ virusIcon } key={ key }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'bacteriaIcon') 
            return (
                <Marker position={[lat, lng]} icon={ bacteriaIcon } key={ key }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'fungusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ fungusIcon } key={ key }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'parasiteIcon') 
            return (
                <Marker position={[lat, lng]} icon={ parasiteIcon } key={ key }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        return (
            <Marker position={[lat, lng]} icon={ germIcon } key={ key }>
                <Popup>
                    <p>{text}</p>
                    <p>Date: {date}</p>
                    <p>Disease: {name}</p>
                </Popup>
            </Marker>
        )
    })
    
    return (
        <Map center={position} zoom={this.state.zoom} minZoom={this.state.min} maxZoom={this.state.max} worldCopyJump='true' maxBounds={bounds}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            noWrap='true'
            />
            <GeoJSON data={this.getCountries()} onEachFeature={this.onEachFeature} style={this.style}></GeoJSON>
            {markers}
            <Marker position={[30,170]} icon={ ausBoat }></Marker>
            <Marker position={[75,3]} icon={ foxBoat }></Marker>
            <Marker position={[-47,-97]} icon={ foxBoat }></Marker>
            <Marker position={[-55,114]} icon={ mooseBoat }></Marker>
            <Marker position={[40,-50]} icon={ mooseBoat }></Marker>
            <Marker position={[-30,198]} icon={ snakeBoat }></Marker>
            <Marker position={[83,43]} icon={ snakeBoat }></Marker>
            <Marker position={[-46,30]} icon={ rhinoBoat }></Marker>
            <Marker position={[83,-135]} icon={ rhinoBoat }></Marker>
            <Marker position={[-57,-29]} icon={ parrotJet }></Marker>
            <Marker position={[83,128]} icon={ parrotJet }></Marker>
            <Marker position={[7,-145]} icon={ rabbitJet }></Marker>

            <Marker position={[-80,-96]} icon={snowIcon}></Marker>
            <Marker position={[-87,-6]} icon={snowIcon}></Marker>
            <Marker position={[-76,73]} icon={snowIcon}></Marker>
            <Marker position={[-80,120]} icon={snowIcon}></Marker>
            <Marker position={[-82,-120]} icon={snowFlakeIcon}></Marker>
            <Marker position={[-74,35]} icon={snowFlakeIcon}></Marker>
            <Marker position={[-83,80]} icon={snowFlakeIcon}></Marker>
            <Marker position={[-71,135]} icon={snowFlakeIcon}></Marker>
            <Marker position={[-83,-80]} icon={penguinIcon}></Marker>
            <Marker position={[-83,-74]} icon={penguinLargeIcon}></Marker>
            <Marker position={[-74,10]} icon={penguinLargeIcon}></Marker>
            <Marker position={[-82,119]} icon={sealIcon}></Marker>
            <Marker position={[-76,40]} icon={mountainIcon}></Marker>

            <Marker position={[-38,-30]} icon={crocodileIcon}></Marker>
            <Marker position={[-21,-7]} icon={octopusIcon}></Marker>
            <Marker position={[71,-140]} icon={octopusIcon}></Marker>
            <Marker position={[-26,82]} icon={lobsterIcon}></Marker>
            <Marker position={[43,-157]} icon={whaleIcon}></Marker>
            <Marker position={[-65,175]} icon={whaleIcon}></Marker>
            <Marker position={[45,-25]} icon={fishIcon}></Marker>
            <Marker position={[50,-28]} icon={fishIcon}></Marker>
            <Marker position={[-52,-155]} icon={fishIcon}></Marker>
            <Marker position={[-58,-150]} icon={fishIcon}></Marker>
            <Marker position={[75,165]} icon={starfishIcon}></Marker>
            <Marker position={[-41,-121]} icon={starfishIcon}></Marker>
        </Map>
    )
  }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(MapContainer);
