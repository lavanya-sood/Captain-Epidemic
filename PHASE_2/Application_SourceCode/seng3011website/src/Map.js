import React, { Component } from 'react'
import { Map, TileLayer, Marker, GeoJSON, Popup } from 'react-leaflet'
import './css/Map.css';
import { geolocated } from "react-geolocated";
import L from 'leaflet';
import countries from './Countries.js'
import { mapResult }from './Maphelper.js'
import { virusIcon, germIcon, bacteriaIcon, parasiteIcon, fungusIcon } from './Icons.js'

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
        min: 3,
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
    
    palmIconSmall = L.icon({
        iconUrl: require('./img/palm-tree.png'),
        iconSize:[15,20],
        iconAnchor: [15,20],
    })
    palmIconLarge = L.icon({
        iconUrl: require('./img/palm-tree.png'),
        iconSize:[35,40],
        iconAnchor: [35,40],
    })
    tree1Icon = L.icon({
        iconUrl: require('./img/tree1.png'),
        iconSize:[25,30],
        iconAnchor: [15,20],
    })
    tree2Icon = L.icon({
        iconUrl: require('./img/tree2.png'),
        iconSize:[35,40],
        iconAnchor: [35,40],
    })
    tree3Icon = L.icon({
        iconUrl: require('./img/tree3.png'),
        iconSize:[25,30],
        iconAnchor: [15,20],
    })
    tree4Icon = L.icon({
        iconUrl: require('./img/tree4.png'),
        iconSize:[40,40],
        iconAnchor: [15,20],
    })
    tree5Icon = L.icon({
        iconUrl: require('./img/tree5.png'),
        iconSize:[35,40],
        iconAnchor: [35,40],
    })
    snowIcon = L.icon({
        iconUrl: require('./img/snow.png'),
        iconSize:[55,55],
        iconAnchor: [35,40],
    })
    snowFlakeIcon = L.icon({
        iconUrl: require('./img/snowflake.webp'),
        iconSize:[25,25],
        iconAnchor: [25,25],
    })
    penguinIcon = L.icon({
        iconUrl: require('./img/penguin.png'),
        iconSize:[20,20],
        iconAnchor: [20,20],
    })
    penguinLargeIcon = L.icon({
        iconUrl: require('./img/penguin.png'),
        iconSize:[35,35],
        iconAnchor: [20,20],
    })
    sealIcon = L.icon({
        iconUrl: require('./img/seal.png'),
        iconSize:[80,50],
        iconAnchor: [20,20],
    })
    mountainIcon = L.icon({
        iconUrl: require('./img/mountain.png'),
        iconSize:[120,80],
        iconAnchor: [20,20],
    })
    kiwiIcon = L.icon({
        iconUrl: require('./img/kiwi.png'),
        iconSize:[35,35],
        iconAnchor: [35,35],
    })
    koalaIcon = L.icon({
        iconUrl: require('./img/koala.png'),
        iconSize:[40,40],
        iconAnchor: [40,40],
    })
    kangarooIcon = L.icon({
        iconUrl: require('./img/kangaroo.png'),
        iconSize:[55,55],
        iconAnchor: [55,55],
    })
    lobsterIcon = L.icon({
        iconUrl: require('./img/lobster.png'),
        iconSize:[20,20],
        iconAnchor: [20,20]
    })
    tiger1Icon = L.icon({
        iconUrl: require('./img/tiger1.png'),
        iconSize:[30,30],
        iconAnchor: [30,30],
    })
    tiger2Icon = L.icon({
        iconUrl: require('./img/tiger2.png'),
        iconSize:[50,40],
        iconAnchor: [30,30],
    })
    pandaIcon = L.icon({
        iconUrl: require('./img/panda.png'),
        iconSize:[40,40],
        iconAnchor: [30,30],
    })
    owlIcon = L.icon({
        iconUrl: require('./img/owl.png'),
        iconSize:[25,30],
        iconAnchor: [30,30],
    })
    elephantIcon = L.icon({
        iconUrl: require('./img/elephant.png'),
        iconSize:[30,30],
        iconAnchor: [30,30],
    })
    foxIcon = L.icon({
        iconUrl: require('./img/fox.png'),
        iconSize:[40,40],
        iconAnchor: [30,30],
    })
    deerIcon = L.icon({
        iconUrl: require('./img/deer.png'),
        iconSize:[55,55],
        iconAnchor: [50,50],
    })
    mooseIcon = L.icon({
        iconUrl: require('./img/moose.png'),
        iconSize:[50,50],
        iconAnchor: [30,30],
    })
    bearIcon = L.icon({
        iconUrl: require('./img/bear.png'),
        iconSize:[70,70],
        iconAnchor: [50,50],
    })
    squirrelIcon = L.icon({
        iconUrl: require('./img/squirrel.png'),
        iconSize:[30,30],
        iconAnchor: [30,30],
    })
    rabbitIcon = L.icon({
        iconUrl: require('./img/rabbit.png'),
        iconSize:[40,40],
        iconAnchor: [40,40],
    })
    ostrichIcon = L.icon({
        iconUrl: require('./img/ostrich.png'),
        iconSize:[40,55],
        iconAnchor: [30,30],
    })
    giraffeIcon = L.icon({
        iconUrl: require('./img/giraffe.png'),
        iconSize:[60,50],
        iconAnchor: [60,60],
    })
    lionIcon = L.icon({
        iconUrl: require('./img/lion.png'),
        iconSize:[40,40],
        iconAnchor: [30,30],
    })
    rhinoIcon = L.icon({
        iconUrl: require('./img/rhino.png'),
        iconSize:[50,50],
        iconAnchor: [30,30],
    })
    flamingoIcon = L.icon({
        iconUrl: require('./img/flamingo.png'),
        iconSize:[60,60],
        iconAnchor: [30,30],
    })
    monkeyIcon = L.icon({
        iconUrl: require('./img/monkey.png'),
        iconSize:[55,55],
        iconAnchor: [30,30],
    })
    capuchinIcon = L.icon({
        iconUrl: require('./img/capuchin.png'),
        iconSize:[40,40],
        iconAnchor: [30,30],
    })
    polarbearIcon = L.icon({
        iconUrl: require('./img/polarbear.png'),
        iconSize:[60,60],
        iconAnchor: [30,30],
    })
    wolfIcon = L.icon({
        iconUrl: require('./img/wolf.png'),
        iconSize:[60,60],
        iconAnchor: [30,30],
    })
    crocodileIcon = L.icon({
        iconUrl: require('./img/crocodile.png'),
        iconSize:[50,50],
        iconAnchor: [30,30],
    })
    skinkIcon = L.icon({
        iconUrl: require('./img/skink.png'),
        iconSize:[40,40],
        iconAnchor: [30,30],
    })
    toucanIcon = L.icon({
        iconUrl: require('./img/toucan.png'),
        iconSize:[30,30],
        iconAnchor: [30,30],
    })
    slothIcon = L.icon({
        iconUrl: require('./img/sloth.png'),
        iconSize:[50,50],
        iconAnchor: [30,30],
    })
    snakeIcon = L.icon({
        iconUrl: require('./img/snake.png'),
        iconSize:[20,20],
        iconAnchor: [30,30],
    })
  render() {
    if (this.props.coords) {
        this.setState({
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
        });
    }
    const position = [this.state.lat, this.state.lng]
    const bounds = [[-Infinity, -180],[Infinity, 180]]
    const markers = this.state.markers.map(({lat, lng, type, name, text, date}) => {
        if (type === 'virusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ virusIcon }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'bacteriaIcon') 
            return (
                <Marker position={[lat, lng]} icon={ bacteriaIcon }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'fungusIcon') 
            return (
                <Marker position={[lat, lng]} icon={ fungusIcon }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        if (type === 'parasiteIcon') 
            return (
                <Marker position={[lat, lng]} icon={ parasiteIcon }>
                    <Popup>
                        <p>{date} {name}</p>
                        <h5>{text}</h5>
                    </Popup>
                </Marker>
            )
        return (
            <Marker position={[lat, lng]} icon={ germIcon }>
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

/*
<Marker position={[-34,151]} icon={this.palmIconSmall}></Marker>
            <Marker position={[-25,125]} icon={this.palmIconLarge}></Marker>
            <Marker position={[68,112]} icon={this.palmIconSmall}></Marker>
            <Marker position={[-17,-44]} icon={this.palmIconSmall}></Marker>
            <Marker position={[-42,-66]} icon={this.palmIconSmall}></Marker>
            <Marker position={[75,61]} icon={this.palmIconSmall}></Marker>
            <Marker position={[46,3]} icon={this.palmIconSmall}></Marker>
            <Marker position={[26,89]} icon={this.palmIconSmall}></Marker>
            <Marker position={[8,13]} icon={this.palmIconSmall}></Marker>
            <Marker position={[-0.2,115]} icon={this.palmIconSmall}></Marker>
            <Marker position={[35,139]} icon={this.palmIconSmall}></Marker>
            <Marker position={[65,161]} icon={this.palmIconLarge}></Marker>
            <Marker position={[-19,22]} icon={this.palmIconLarge}></Marker>
            <Marker position={[53,-70]} icon={this.palmIconLarge}></Marker>
            <Marker position={[6,-63]} icon={this.palmIconLarge}></Marker>
            <Marker position={[47,64]} icon={this.palmIconLarge}></Marker>

            <Marker position={[78,17]} icon={this.tree1Icon}></Marker>
            <Marker position={[81,-72]} icon={this.tree1Icon}></Marker>
            <Marker position={[59,-126]} icon={this.tree1Icon}></Marker>
            <Marker position={[25,44]} icon={this.tree1Icon}></Marker>
            <Marker position={[62,128]} icon={this.tree1Icon}></Marker>

            <Marker position={[79,-47]} icon={this.tree2Icon}></Marker>
            <Marker position={[71,-34]} icon={this.tree2Icon}></Marker>
            <Marker position={[70,-108]} icon={this.tree2Icon}></Marker>
            <Marker position={[38,-104]} icon={this.tree2Icon}></Marker>
            <Marker position={[55,43]} icon={this.tree2Icon}></Marker>
            <Marker position={[75,98]} icon={this.tree2Icon}></Marker>

            <Marker position={[-39,176]} icon={this.tree3Icon}></Marker>
            <Marker position={[52,93]} icon={this.tree3Icon}></Marker>
            <Marker position={[79,97]} icon={this.tree3Icon}></Marker>
            <Marker position={[22,-5]} icon={this.tree3Icon}></Marker>
            <Marker position={[65,-144]} icon={this.tree3Icon}></Marker>
            <Marker position={[80,-29]} icon={this.tree3Icon}></Marker>

            <Marker position={[69,-72]} icon={this.tree4Icon}></Marker>
            <Marker position={[68,24]} icon={this.tree4Icon}></Marker>

            <Marker position={[-5,140]} icon={this.tree5Icon}></Marker>
            <Marker position={[66,-170]} icon={this.tree5Icon}></Marker>
            <Marker position={[60,74]} icon={this.tree5Icon}></Marker>

            <Marker position={[-80,-96]} icon={this.snowIcon}></Marker>
            <Marker position={[-83,-6]} icon={this.snowIcon}></Marker>
            <Marker position={[-76,73]} icon={this.snowIcon}></Marker>
            <Marker position={[-80,120]} icon={this.snowIcon}></Marker>

            <Marker position={[-82,-120]} icon={this.snowFlakeIcon}></Marker>
            <Marker position={[-74,35]} icon={this.snowFlakeIcon}></Marker>
            <Marker position={[-83,80]} icon={this.snowFlakeIcon}></Marker>
            <Marker position={[-71,135]} icon={this.snowFlakeIcon}></Marker>

            <Marker position={[-83,-80]} icon={this.penguinIcon}></Marker>
            <Marker position={[-83,-74]} icon={this.penguinLargeIcon}></Marker>
            <Marker position={[-74,10]} icon={this.penguinLargeIcon}></Marker>

            <Marker position={[-82,119]} icon={this.sealIcon}></Marker>

            <Marker position={[-76,30]} icon={this.mountainIcon}></Marker>

            <Marker position={[-46,171.3]} icon={this.kiwiIcon}></Marker>

            <Marker position={[-21,146]} icon={this.koalaIcon}></Marker>

            <Marker position={[-32,127]} icon={this.kangarooIcon}></Marker>

            <Marker position={[-6,154]} icon={this.lobsterIcon}></Marker>

            <Marker position={[-1,105]} icon={this.tiger1Icon}></Marker>

            <Marker position={[15,106]} icon={this.pandaIcon}></Marker>
            <Marker position={[23,80]} icon={this.elephantIcon}></Marker>
            <Marker position={[65,140]} icon={this.owlIcon}></Marker>
            <Marker position={[47,74]} icon={this.tiger2Icon}></Marker>
            <Marker position={[20,52]} icon={this.foxIcon}></Marker>
            <Marker position={[63,61]} icon={this.deerIcon}></Marker>
            <Marker position={[49,20]} icon={this.squirrelIcon}></Marker>
            <Marker position={[60,100]} icon={this.bearIcon}></Marker>
            <Marker position={[66,176]} icon={this.rabbitIcon}></Marker>

            <Marker position={[10,0]} icon={this.lionIcon}></Marker>
            <Marker position={[20,31]} icon={this.ostrichIcon}></Marker>
            <Marker position={[31,4]} icon={this.rhinoIcon}></Marker>
            <Marker position={[-15,37]} icon={this.giraffeIcon}></Marker>
            <Marker position={[-28,22]} icon={this.flamingoIcon}></Marker>
            <Marker position={[-25,46]} icon={this.capuchinIcon}></Marker>

            <Marker position={[83,-40]} icon={this.polarbearIcon}></Marker>
            <Marker position={[71,-142]} icon={this.wolfIcon}></Marker>
            <Marker position={[53,-115]} icon={this.mooseIcon}></Marker>
            <Marker position={[45,-73]} icon={this.skinkIcon}></Marker>
            <Marker position={[18,-95]} icon={this.crocodileIcon}></Marker>

            <Marker position={[0,-50]} icon={this.snakeIcon}></Marker>
            <Marker position={[-32,-58]} icon={this.slothIcon}></Marker>
            <Marker position={[-52,-68]} icon={this.toucanIcon}></Marker>
            <Marker position={[-3,-39]} icon={this.monkeyIcon}></Marker>
            */
