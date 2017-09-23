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
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="true" name="map1"></aeris-eccad-map> 	
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="map2"></aeris-eccad-map> 	  
      </div>
    </div>

    <div v-show="auth && toolsMenu && toolsLink.text === 'Mapcompare'">
      <div class="headerFlex">
        <div style="width: 49%;">
          <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="mapcompare1" small="true"></aeris-eccad-map> 	
        </div>
        <div style="width: 49%;">
          <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" first="false" name="mapcompare2" small="true"></aeris-eccad-map> 	  
        </div>
      </div>
      <div>
        <aeris-eccad-map service="http://thredds.sedoo.fr/thredds/wms/eccad/" name="compare" compare="true"></aeris-eccad-map> 	  
      </div>
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

    <div v-show="home">
      <aeris-eccad-geo-map></aeris-eccad-geo-map>
    </div>
    

  </span> 
</template>

<script>
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
       home: true,
       loginForm: false,
    }    
  },
  
  watch: {
    mainMenu (value) {
      if(value === 'tools') {
        this.selectionBar = true;
        this.toolsMenu = true;
        this.catalogMenu = false;
        this.home = false;
      } else if (value === 'catalog') {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = true;
         this.home = false;
      } 
      else if (value === 'admin') {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = false;
        this.home = false;
      } else if (value === 'home') {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = false;
        this.home = true;  
      }else {
        this.selectionBar = false;
        this.toolsMenu = false;
        this.catalogMenu = false;
        this.home = false;
      }
    }
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('mainmenu', this.setMainMenu);
    document.removeEventListener('catalogmenu',this.setCatalogLink);
    document.removeEventListener('toolsmenu', this.setToolsLink);
    document.removeEventListener('auth', this.setAuth);
    document.removeEventListener('loginForm', this.setLoginForm);
  },
  
  created: function () {
    console.log("Aeris Eccad App - Creating"); 
    document.addEventListener('mainmenu', this.setMainMenu);
    document.addEventListener('catalogmenu',this.setCatalogLink);
    document.addEventListener('toolsmenu', this.setToolsLink);
    document.addEventListener('auth', this.setAuth);
    document.addEventListener('loginForm', this.setLoginForm);		        
  },
  
  computed: {
  },
  
  methods: {   
    setMainMenu: function(evt) {
      this.mainMenu = evt.detail;
    },
    
    setCatalogLink: function(evt) {
      this.catalogLink = evt.detail;
    },

    setToolsLink: function(evt) {
      this.toolsLink = evt.detail;
    },

    setAuth: function(evt) {
      this.auth = evt.detail;
    },

    setLoginForm: function(evt) {
      this.loginForm = true;
    },
 }
}
</script>

<style>
   .minToolsHeight {
     min-height: 500px;
   }
</style>