// get url of geojson data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Create map that plots all the earthquakes from dataset based on longitude and latitude
var myMap = L.map("map", {
    center:[20,-15],
    zoom: 3
});

// Create tile layer to be background of map and add to map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// change color based on depth of earthquake
// https://stackoverflow.com/questions/37357755/assign-color-of-leaflet-circlemarker-to-range-of-values
// https://leafletjs.com/examples/choropleth/
function getColor(depth) {
    return depth > 90 ? '#800026' :
           depth > 70  ? '#BD0026' :
           depth > 50  ? '#E31A1C' :
           depth > 30  ? '#FC4E2A' :
           depth > 10   ? '#FD8D3C' :
                      '#FFEDA0';
}

// connect to geojson api using d3
d3.json(url).then(function (response) {

    let earthquakes = response.features;

    for (let i = 0; i < earthquakes.length; i++) {

        let [lon, lat, depth] = earthquakes[i].geometry.coordinates
        let magnitude = earthquakes[i].properties.mag

        // data markers should reflect magnitude of earthquake by size and depth of earthquake by color 
        // higher mag = larger, great depth=darker
        L.circle([lat, lon], {
            fillOpacity: 1,
            color: "white",
            fillColor: getColor(depth),
            radius: magnitude * 55000

        // include popups that provide additional info about earthquake when associated marker is clicked
        }).bindPopup(`<h3>Place: ${earthquakes[i].properties.place}</h3> <hr> <h3>Magnitude: ${magnitude}</h3> <hr> <h3> Depth: ${depth} km</h3`).addTo(myMap);

    };

});

// create a legend that will provide context for map data
// https://codepen.io/haakseth/pen/KQbjdO

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "legend");

    div.innerHTML += '<h3>Earthquake Depth</h3>';

    div.innerHTML += '<i style = "background: #FFEDA0"></i><span>less than 10 km</span><br>'
    div.innerHTML += '<i style = "background: #FD8D3C"></i><span>10 km - 30 km</span><br>'
    div.innerHTML += '<i style = "background: #FC4E2A"></i><span>30 km - 50 km</span><br>'
    div.innerHTML += '<i style = "background: #E31A1C"></i><span>50 km - 70 km</span><br>'
    div.innerHTML += '<i style = "background: #BD0026"></i><span>70 km - 90 km</span><br>'
    div.innerHTML += '<i style = "background: #800026"></i><span>90 km or greater</span><br>'

    return div;
};

legend.addTo(myMap);