/*
 dependances: 
*/


<template>
  <div>
    <br />
    <div class="etFlex">
      <aeris-eccad-category :service="categoryService" ets="true"></aeris-eccad-category>
      <aeris-eccad-parameter :service="parameterService" ets="true"></aeris-eccad-parameter>
      <div>
         <input type="radio" name="glb" value="global" checked="checked" @click="changeGbl(etGlobal)"/>global
        <!--input type="radio" name="glb" value="global" v-model="etGlobal" data-ng-checked="global" data-ng-change="globalChange()">global</input-->
      </div>
      <div>
          <input type="radio" name="glb" value="regional" @click="changeGbl(etRegional)"/>regional
        <!--input type="radio" name="glb" value="regional" v-model="etRegional">regional</input-->
      </div>
      <div>
        <input type="button" class="etButton" @click="showTimeSeries()" value="Show time series"></input>
      </div>
    </div>
    <br />
    
    <div class="etExample" v-show="!showGraph">
      <div>
        <i class="fa fa-info-circle" style="height: 20px;"></i>
        <span>Please choose a datatype, parameter and click the button<br>Example:</span>
      </div>
      <img src="images/exampleEmissionsTimeseries.png">
    </div>

    <div class="etChart" v-show="showGraph">
      <aeris-eccad-emissiontschart identifier="etTotals" minmaxtotal="3"></aeris-eccad-emissiontschart>
      <aeris-eccad-emissiontschart identifier="etMax" minmaxtotal="2"></aeris-eccad-emissiontschart>
      <aeris-eccad-emissiontschart identifier="etMin" minmaxtotal="1"></aeris-eccad-emissiontschart>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    service: {
      type: String,
      default: ''
    },
  },
  
  data () {
    return {
      categoryService: 'http://eccad.aeris-data.fr/eccad2web/rest/data/categories',
      parameterService: 'http://eccad.aeris-data.fr/eccad2web/rest/data/parameters',
    	colors: {type: Array},
    	selectedColor: {type: Object},
      showGraph: false
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
    console.log("Aeris Eccad Emission Time Series - Creating");
    EventBus.$on('showETSGraph', data => {
      this.showGraph = JSON.parse(data);
    });
  },
  
  computed: {
  },
  
  methods: {
    showTimeSeries: function() {
      EventBus.$emit('showETS', JSON.stringify(true));
    },

    changeGbl: function(value) {
      if(value === global) {
        this.isGlobal = true;
      }
      else {
        this.isGlobal = false;
      }
      EventBus.$emit('etGlobal', JSON.stringify(this.isGlobal));
    }   
  }
}
</script>

<style>

.aeris-eccad-color-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-color-list {
    display: inline-block;
}

.aeris-eccad-color-list > select {
   width: 120px;
}
	
</style>