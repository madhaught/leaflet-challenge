# leaflet-challenge
This repository is for the edX Data and Visualization Bootcamp associated with Case Western Reserve University. The assignment represented in this repo is for module 15 - mapping with javascript.

In this assignment I used D3 and Leaflet to read in geoJSON data about earthquakes and visualize it on an interactive map. 

The data is from the USGS GeoJSON Feed https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. I chose to visualize all earthquaikes from the past 7 days from this url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson. 

I created a map and tilelayer with leaflet. The tile layer is from https://www.openstreetmap.org/copyright.

Once the data was available I used it to create markers in the locations of the earthquakes. I modified the markers so that they varied in size based on the magnitude of the earthquakes and in color based on the depth of the earthquakes. I also added a legend to indicate which colors correspond with which depths. 

To create the legend, I used code from https://codepen.io/haakseth/pen/KQbjdO and to modify the colors I used code from https://leafletjs.com/examples/choropleth/. This usage is marked in the style.css and logic.js files via comment above the lines of code.

Most of my work was done in the logic.js file in the js folder inside of the static folder. I used the provided starter code to get the index.html file and the body and map sections in the style.css file in the css folder inside of the static folder.

To view this code one can go live with the index.html file.