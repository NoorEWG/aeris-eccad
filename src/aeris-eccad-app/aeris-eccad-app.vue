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
    
    <div v-show="!auth && toolsMenu || loginForm">
      <aeris-eccad-login></aeris-eccad-login>  
    </div>
    
    <div v-show="auth && selectionBar">
      <aeris-eccad-selection service="http://eccad.aeris-data.fr/eccad2web/rest/"></aeris-eccad-selection>
    </div> 

    <div v-show="auth && toolsMenu">
      <aeris-eccad-toolsmenu></aeris-eccad-toolsmenu>  
    </div>

     <div v-show="catalogMenu">
      <aeris-eccad-catalogmenu></aeris-eccad-catalogmenu>  
    </div> 
  
    <div v-show="catalogMenu && catalogLink.text === 'Inventories'">
      <aeris-eccad-catalog service="http://eccad.aeris-data.fr/eccad2web/rest/dataset/inventorydatasets?catgroup="></aeris-eccad-catalog>
    </div>
    
    <div v-show="catalogMenu && catalogLink.text === 'Sectors'">	 	
      <aeris-eccad-catalog-sector service="http://eccad.aeris-data.fr/eccad2web/rest/dataset/inventoriesandsectors" ></aeris-eccad-catalog-sector>
    </div>
    
    <div v-show="catalogMenu && catalogLink.text === 'Scenarios'">	 	
      <aeris-eccad-catalog-scenario service="http://eccad.aeris-data.fr/eccad2web/rest/dataset/inventoriesandscenarios" ></aeris-eccad-catalog-scenario>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Species'">	 	
      <aeris-eccad-species></aeris-eccad-species>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Temporal'">	 	
      <aeris-eccad-temporalchart></aeris-eccad-temporalchart>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Emission Time Series'">	 	
      <aeris-eccad-emissionts></aeris-eccad-emissionts>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Inventory Time Series'">	 	
      <aeris-eccad-inventoryts></aeris-eccad-inventoryts>
    </div>

    <div v-show="catalogMenu && catalogLink.text === 'Metadata'">	 	
      <aeris-eccad-metadata></aeris-eccad-metadata>
    </div>
    
    <div v-show="catalogMenu && catalogLink.text === 'Data search'">	 	
      <aeris-eccad-dashboard></aeris-eccad-dashboard>
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Map Display'" class="minToolsHeight">
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="map1"></aeris-eccad-map> 	
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="map2"></aeris-eccad-map> 	  
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Mapcompare'" class="headerFlex">
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="mapcompare1" small="true"></aeris-eccad-map> 	
      </div>
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="mapcompare2" small="true"></aeris-eccad-map> 	  
      </div>
      <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="compare" compare="true"></aeris-eccad-map> 	  
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Timeseries Analysis'">
      <aeris-eccad-barchart service="http://eccad.aeris-data.fr/eccad2web/rest/dataanalysis/barchart"></aeris-eccad-barchart>
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Scatterplot'">
      <aeris-eccad-scatterplot></aeris-eccad-scatterplot>
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Download'">
      <aeris-eccad-download></aeris-eccad-download>
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
       auth: false,
       mainMenu: '',
       selectionBar: false,
       toolsMenu: false,
       catalogMenu: false,
       loginForm: false,
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
      this.mainMenu = JSON.parse(data);
		});
    EventBus.$on('catalogmenu', data => {
      this.catalogLink = JSON.parse(data);
		});
    EventBus.$on('toolsmenu', data => {
      this.toolsLink = JSON.parse(data);
		});	
    EventBus.$on('auth', data => {
      this.auth = JSON.parse(data);
		});	
    EventBus.$on('loginForm', data => {
      this.loginForm = true;
		});		        
  },
  
  computed: {
  },
  
  methods: {   
 }
}
</script>

<style>
   .minToolsHeight {
     min-height: 500px;
   }
</style>