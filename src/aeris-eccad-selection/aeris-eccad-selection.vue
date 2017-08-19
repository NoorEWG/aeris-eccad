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

      <div class="sectionDrawColumn">
        <aeris-eccad-rb-unit :service="unitService"></aeris-eccad-rb-unit> 
        <button>Draw</button>
        <aeris-eccad-rb-unit :service="unitService" first="false"></aeris-eccad-rb-unit> 	
        
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
      unitService: this.service + 'data/totalunit'
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