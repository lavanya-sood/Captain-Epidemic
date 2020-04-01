import L from 'leaflet';

const virusIcon = L.icon({
    iconUrl: require('./img/virus.png'),
    iconSize:[20,20],
    iconAnchor: [20,20],
})
const fungusIcon = L.icon({
    iconUrl: require('./img/fungus.png'),
    iconSize:[20,20],
    iconAnchor: [20,20],
})
const bacteriaIcon = L.icon({
    iconUrl: require('./img/bacteria.png'),
    iconSize:[20,20],
    iconAnchor: [20,20],
})
const parasiteIcon = L.icon({
    iconUrl: require('./img/parasite.png'),
    iconSize:[20,20],
    iconAnchor: [20,20],
})
const germIcon = L.icon({
    iconUrl: require('./img/germ.png'),
    iconSize:[20,20],
    iconAnchor: [20,20],
})

export { virusIcon };
export { bacteriaIcon };
export { fungusIcon };
export { parasiteIcon };
export { germIcon };