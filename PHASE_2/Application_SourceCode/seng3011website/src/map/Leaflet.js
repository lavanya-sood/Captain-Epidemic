import React, { Component } from 'react'
import { Map, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet'
import '../css/Map.css';
import '../css/Leaflet.css';
import L from 'leaflet';
import countries from './Countries.js'
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

function onEachFeatureHelper(api, country) {
    var topDiseases = {}
    for (var i = 0; i < api.length; i++) {
        if (country.indexOf(api[i].country) !== -1) {
            var name = api[i].name
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
        if (items[i][0] === 'undefined' || items[i][0] === 'other') {
            result += items[i][0] + '<br>'
        } else {
            result +=  '<a href="#/info/' + items[i][0] + '" class="disease-map-link">' + items[i][0] + '</a><br>'
        }
        
    }
    return result
}

function checkCountries(country, countries) {
    for(var i = 0; i < countries.length; i++) {
        if (countries[i].indexOf(country) !== -1) {
            return countries[i]
        }
    }
    return false
}

function getCurrentMonth() {
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
    var month = new Date().getMonth()
    return months[month];
}

class LeafletMap extends Component {
    state = {
        api: '',
        loading: 'true',
        countries: '',
        diseases: ''
    }
    callAPI() {
        fetch("/map")
            .then(res => res.json())
            .then(res => this.setState({ api: res, loading: 'false' }));
    }
    callLocationAPI() {
        fetch("/map/countries")
            .then(res => res.json())
            .then(res => this.setState({ countries: res }))
    }
    componentDidMount() {
        this.callAPI();
        this.callLocationAPI();
        if (this.props.data) {
            this.setState({
                lat: this.props.data.lat,
                lng: this.props.data.lng,
                zoom: this.props.data.zoom,
                min: this.props.data.min,
                max: this.props.data.max,
                drag: this.props.data.drag,
                class: this.props.data.class
            });
        }
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

    onEachFeatureApi(api, map, countries) {
        if (!countries) {
            return
        }
        return function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
            const result = onEachFeatureHelper(api, feature.properties.name)
            const country = checkCountries(feature.properties.name, countries)
            var ahref = '#/location/' + country
            if (result.length > 0) {
                if (map === true) {
                    if (country !== false) {
                        layer.bindPopup('<h3 class="monthly-title"><a href="'+ahref+'" class="country-map-link">'+feature.properties.name+' - '+ getCurrentMonth() + ' Disease Ranking</h3></a><p class="country-ranking">' + result + '</p>') 
                    } else {
                        layer.bindPopup('<h3 class="monthly-title">'+feature.properties.name+' - '+ getCurrentMonth() + ' Disease Ranking</h3></a><p class="country-ranking">' + result + '</p>') 
                    }
                } else {
                    layer.bindPopup('<h3 class="monthly-title">'+feature.properties.name+' - '+ getCurrentMonth() + ' Disease Ranking</h3><p class="country-ranking">' + result + '</p>', {autoPan:false}) 
                }
            } else {
                if (map === true) {
                    if (country !== false) {
                        layer.bindPopup('<h3 class="monthly-title"><a href="'+ahref+'" class="country-map-link">'+feature.properties.name+'</a></h3><p class="country-ranking">No diseases in ' + getCurrentMonth() + '</p>')
                    } else {
                        layer.bindPopup('<h3 class="monthly-title"><class="country-map-link">'+feature.properties.name+'</a></h3><p class="country-ranking">No diseases in ' + getCurrentMonth() + '</p>')
                    }
                } else {
                    layer.bindPopup('<h3 class="monthly-title"><a href="'+ahref+'" class="country-map-link">'+feature.properties.name+'</a></h3><p class="country-ranking">No diseases in ' + getCurrentMonth() + '</p>', {autoPan:false})
                }
            }
        }
    }

    render() {
    if (this.state.api === '' || this.state.countries === '') {
        return <h3 className="headingpage loading">Loading...</h3>
    }
    const position = [this.state.lat, this.state.lng]
    const bounds = [[-Infinity, -180],[Infinity, 180]]
    const markers = this.state.api.map(({lat, lng, type, name, text, date, key}) => {
        var ahref = '#/info/' + name
        if (type === 'virusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ virusIcon } key={ key }>
                    <Popup autoPan={this.state.drag}>
                        <h3 className="disease-map"><a href={ahref} className="disease-title-map">{name}</a></h3>
                        <p className="date-map">{date}</p>
                        <p className="report-title-maps">{text}</p>
                    </Popup>
                </Marker>
            )
        if (type === 'bacteriaIcon') 
            return (
                <Marker position={[lat, lng]} icon={ bacteriaIcon } key={ key }>
                    <Popup autoPan={this.state.drag}>
                        <h3 className="disease-map"><a href={ahref} className="disease-title-map">{name}</a></h3>
                        <p className="date-map">{date}</p>
                        <p className="report-title-maps">{text}</p>
                    </Popup>
                </Marker>
            )
        if (type === 'fungusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ fungusIcon } key={ key }>
                    <Popup autoPan={this.state.drag}>
                        <h3 className="disease-map"><a href={ahref} className="disease-title-map">{name}</a></h3>
                        <p className="date-map">{date}</p>
                        <p className="report-title-maps">{text}</p>
                    </Popup>
                </Marker>
            )
        if (type === 'parasiteIcon') 
            return (
                <Marker position={[lat, lng]} icon={ parasiteIcon } key={ key }>
                    <Popup autoPan={this.state.drag}>
                        <h3 className="disease-map"><a href={ahref} className="disease-title-map">{name}</a></h3>
                        <p className="date-map">{date}</p>
                        <p className="report-title-maps">{text}</p>
                    </Popup>
                </Marker>
            )
        return (
            <Marker position={[lat, lng]} icon={ germIcon } key={ key }>
                <Popup autoPan={this.state.drag}>
                    <h3 className="disease-map"><a href={ahref} className="disease-title-map">{name}</a></h3>
                    <p className="date-map">{date}</p>
                    <p className="report-title-maps">{text}</p>
                </Popup>
            </Marker>
        )
    })
    return (
        <div>
        <Map className={this.state.class} center={position} zoom={this.state.zoom} minZoom={this.state.min} maxZoom={this.state.max} worldCopyJump='true' maxBounds={bounds} dragging={this.state.drag} doubleClickZoom={this.state.drag} keyboard={this.state.drag}>
            <TileLayer 
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            noWrap='true'
            />
            <GeoJSON data={this.getCountries()} onEachFeature={this.onEachFeatureApi(this.state.api, this.state.drag, this.state.countries)} style={this.style}></GeoJSON>
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
        </div>
    );
    }
}

export default LeafletMap;