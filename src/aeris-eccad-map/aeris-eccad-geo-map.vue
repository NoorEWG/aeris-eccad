<template>
  <div>
	<gmap-map
		ref="geomap"
		:center="center"
		:zoom="zoom"
		style="width: 100%; height: 650px;">
		<gmap-rectangle v-for="geo, index in geospatials" :bounds="geo.bounds" :key="geo.inventories" :options="rectangleOptions" v-if="index > 0"></gmap-rectangle> 
		<gmap-info-window v-for="geo in geospatials" :position="geo.position" :key="geo.inventories">{{geo.inventories}}</gmap-info-window>   
	</gmap-map>
  </div>
</template>

<script>

import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';

export default {
  props: {
    service:  {
      type: String,
      default: ''
    },
	name: {
	  type: String,
      default: 'geospatialmap'	
	}

  },
  
 data () {
      return {
        center: {lat: 0.0, lng: 0.0},
		zoom: 2,
		rectangleOptions: {
		  strokeColor: '#00008B',
          strokeOpacity: 0.3,
          strokeWeight: 1,
          fillColor: '#00008B',
          fillOpacity: 0.1,
		},
        eccadConfig: {
		   api: 'http://eccad.aeris-data.fr/eccad2web/rest/'
	    },
		geospatials: [
			{inventories: 'ACCMIP / AMMABB / Andres-CO2-v2016 / CEDS / Cities / ECLIPSE-GAINS / EDGAR / GEIA / GFAS / GFED / GICC / GPW3 / GUESS-ES / HTAPv2 / HYDE1.3 / IMAGE2.4 / IS4FIRES / Junker-Liousse / MACCity / MEGAN / Pixel-Area / PKU / POET / RCPs / RETRO', bounds: {north: 90.00, south: -90.00, east: 180.00, west: -180.00}, position: {lat: 78.5, lng: -140 }},
			{inventories: 'DACCIWA / L14-Africa', bounds: {north: 38.00, south: -35.00, east: 52.00, west: -18.00}, position: {lat: 38, lng: -18}},
	        {inventories: 'TNO-MACC', bounds: {north: 71.00, south: -30.00, east: 59.00, west: -30.00}, position: {lat: 71, lng: 59}},
			{inventories: 'MODIS-MCD64A1', bounds: {north: 20.00, south:0, east: 10.00, west:	-10.00}, position: {lat: 20, lng: -10}},
			{inventories: 'GlobEmission', bounds: {north: 50.00, south: 28.00, east: 132.00 ,west: 102.00}, position: {lat: 50, lng: 102}},
			{inventories: 'APIFLAME',bounds: {north: 70.00, south: 10.00, east: 50.00 ,west: -20.00}, position: {lat: 70, lng: -20}},
			{inventories: 'REAS', bounds: {north: 80.00, south: -16.00, east: 180.00 ,west: 46.00}, position: {lat: 80, lng: 46}},
			{inventories: 'EMEP', bounds: {north: 75.00, south: 30.00, east: 60.00 ,west: -29.00}, position: {lat: 75, lng: -29}}       
		],
      }
  },
  
   watch: {
	   
  },
  computed: {  
  },
  
  mounted: function () {
  },
    
  destroyed: function() {
  },
  
  created: function () {
	console.log("Aeris Eccad Geospatial Map - Creating");
	this.getGeospatials();
  },  
	
  methods: {
	getGeospatials: function() {

	},   
  }
}  

</script>

<style>

</style>