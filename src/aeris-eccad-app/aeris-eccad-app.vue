/*
 dependances: 
*/


<template>
	<span>
    <div>
      <aeris-eccad-header></aeris-eccad-header>
    </div>

    <div>
      <aeris-eccad-mainmenu></aeris-eccad-mainmenu>
    </div>  
    
    <div v-show="selectionBar">
      <aeris-eccad-selection service="http://eccad.aeris-data.fr/eccad2web/rest/"></aeris-eccad-selection>
    </div> 

    <div v-show="toolsMenu">
      <aeris-eccad-toolsmenu></aeris-eccad-toolsmenu>  
    </div>

     <div v-show="catalogMenu">
      <aeris-eccad-catalogmenu></aeris-eccad-catalogmenu>  
    </div> 
  
    <div v-show="catalogMenu && catalogLink.text === 'Inventories'">
      <aeris-eccad-catalog service="http://eccad.aeris-data.fr/eccad2web/rest/dataset/inventorydatasets?catgroup=emissions"></aeris-eccad-catalog>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Dashboard'">	 	
      <aeris-eccad-dashboard></aeris-eccad-dashboard>
    </div>

    <div v-show="toolsMenu && toolsLink.text === 'Map'">
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="map1"></aeris-eccad-map> 	
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="map2"></aeris-eccad-map> 	  
    </div>

    <div v-show="toolsMenu && toolsLink.text === 'Mapcompare'" class="headerFlex">
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="mapcompare1" small="true"></aeris-eccad-map> 	
      </div>
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="mapcompare2" small="true"></aeris-eccad-map> 	  
      </div>
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="compare" compare="true"></aeris-eccad-map> 	  
    </div>

    <div v-show="toolsMenu && toolsLink.text ==='Timeseries Analysis'">
      <aeris-eccad-barchart service="http://eccad.aeris-data.fr/eccad2web/rest/dataanalysis/barchart"></aeris-eccad-barchart>
    </div>

  </span> 
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    
  },
  
  data () {
    return {
       catalogLink: {
         url: '',
         text: '',
         menu: ''
       },
       toolsLink: {
         url: '',
         text: '',
         menu: ''
       },
       mainMenu: '',
       selectionBar: false,
       toolsMenu: false,
       catalogMenu: false
    }    
  },
  
  watch: {
    mainMenu (value) {
      console.log("mainMenu: " + value)
      if(value === 'tools') {
        this.selectionBar = true;
        this.toolsMenu = true;
        this.catalogMenu = false;
      } else if (value === 'catalog') {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = true;
      } else {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = false;
      }
    }
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() {
    
  },
  
  created: function () {
    console.log("Aeris Eccad App - Creating");
    EventBus.$on('mainmenu', data => {
			console.log("main menu changed!");
      this.mainMenu = JSON.parse(data);
		});
    EventBus.$on('catalogmenu', data => {
			console.log("aeris eccad app: catalogmenu: " + JSON.stringify(data));
      this.catalogLink = JSON.parse(data);
		});
    EventBus.$on('toolsmenu', data => {
			console.log("aeris eccad app: toolsmenu: " + JSON.stringify(data));
      this.toolsLink = JSON.parse(data);
		});		        
  },
  
  computed: {
  },
  
  methods: {   
 }
}
</script>

<style>
</style>