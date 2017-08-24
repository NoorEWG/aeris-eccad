/*
 dependances: 
*/

<template>
  <div class="selectionFlex">
      <div class="selectionColumn">
        <div class="selectionRow"> 
          <div class="selectItem">
            <aeris-eccad-category :service="categoryService"></aeris-eccad-category>
          </div>
          <div class="selectItem">
            <aeris-eccad-scenario :service="scenarioService"></aeris-eccad-scenario>
          </div>
        </div>   
        <div class="selectionRow">   
          <div class="selectItem">
            <aeris-eccad-parameter :service="parameterService"></aeris-eccad-parameter>
          </div>
          <div class="selectItem">
            <aeris-eccad-sector :service="sectorService"></aeris-eccad-sector>   
          </div> 
        </div>
        <div class="selectionRow"> 
          <div class="selectItem">
            <aeris-eccad-dataset :service="datasetService"></aeris-eccad-dataset>
          </div>
          <div class="selectItem">
            <aeris-eccad-date></aeris-eccad-date>
          </div>
        </div>
        buttons todo
        <div class="selectionRow"> 
          <div class="selectItem">
            <aeris-eccad-category :service="categoryService" first="false"></aeris-eccad-category>
          </div>
          <div class="selectItem">
            <aeris-eccad-scenario :service="scenarioService" first="false"></aeris-eccad-scenario>
          </div>
        </div>   
        <div class="selectionRow">   
          <div class="selectItem">
            <aeris-eccad-parameter :service="parameterService" first="false"></aeris-eccad-parameter>
          </div>
          <div class="selectItem">
            <aeris-eccad-sector :service="sectorService" first="false"></aeris-eccad-sector>   
          </div> 
        </div>
        <div class="selectionRow"> 
          <div class="selectItem">
            <aeris-eccad-dataset :service="datasetService" first="false"></aeris-eccad-dataset>
          </div>
          <div class="selectItem">
            <aeris-eccad-date first="false"></aeris-eccad-date>
          </div>
        </div>
      </div>

      <div class="selectionDrawColumn">
        <div class="selectionDrawRow">
          <div class="selectItemH">
            <aeris-eccad-rb-unit :service="unitService"></aeris-eccad-rb-unit> 
          </div>
          <div class="selectItemH">  
            <aeris-eccad-mask :service="maskService"></aeris-eccad-mask>
            <aeris-eccad-geospatial :service="geospatialService"></aeris-eccad-geospatial>
          </div>
        </div>
        <div class="selectionDrawRow">
            <button>Draw</button>
            <aeris-eccad-bbox></aeris-eccad-bbox>
        </div>
        <div class="selectionDrawRow">
          <div class="selectItem">
            <aeris-eccad-rb-unit :service="unitService" first="false"></aeris-eccad-rb-unit> 	
          </div>
        </div>
      </div>
 
      <div class="selectionColumn">
        <div class="selectionRow">
          <div class="selectItem">
            <aeris-eccad-color :service="colorService"></aeris-eccad-color>
            <aeris-eccad-numcolors></aeris-eccad-numcolors>
          </div>
          <div class="selectItem">
            <aeris-eccad-range></aeris-eccad-range>
            <aeris-eccad-scale></aeris-eccad-scale>
          </div>
          <div class="selectItem">
            <aeris-eccad-min></aeris-eccad-min>
            <aeris-eccad-max></aeris-eccad-max>
          </div>
           <div class="selectItem">
            <aeris-eccad-min first="false"></aeris-eccad-min>
            <aeris-eccad-max first="false"></aeris-eccad-max>
          </div>
        </div>
      </div>
  </div>     
</template>
  
<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    first: {
      type: Boolean,
      default: true
    },
    service: {
      type: String    
    }
  },
  
  data () {
    return {
      categoryService: this.service + 'data/categories',
      parameterService: this.service + 'data/parameters',
      scenarioService: this.service + 'data/scenarios',
      datasetService: this.service + 'data/inventories',
      sectorService: this.service + 'data',
      unitService: this.service + 'data/totalunit',
      maskService: this.service + 'dataanalysis/masks',
      colorService: this.service + 'data/colors',
      geospatialService: this.service + 'data/geospatial'
    }
  },
  
  watch: {
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  },
  
  created: function () {
    console.log("Aeris Eccad Selection Bar - Creating");
    
  },
  
  computed: {
  },
  
  methods: {
 
  }
}
</script>

<style>

	
</style>