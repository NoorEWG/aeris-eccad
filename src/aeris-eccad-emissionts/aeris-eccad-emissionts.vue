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
      </div>
      <div>
          <input type="radio" name="glb" value="regional" @click="changeGbl(etRegional)"/>regional
      </div>
      <div>
        <input type="button" class="etButton" @click="showTimeSeries()" value="Show time series"></input>
      </div>
    </div>
    <br />
    
    <div class="etExample" :show="!showGraph">
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
     document.removeEventListener('showETSGraph', this.setShowGraph);
  },
  
  created: function () {
    console.log("Aeris Eccad Emission Time Series - Creating");
    document.addEventListener('showETSGraph', this.setShowGraph);
  },
  
  computed: {
  },
  
  methods: {
    
    setShowGraph: function(evt) {
      this.showGraph = evt.detail;
    },
    
    showTimeSeries: function() {
      var ev1 = new CustomEvent('showETS', { 'detail': true });
      document.dispatchEvent(ev1); 
    },

    changeGbl: function(value) {
      if(value === 'global') {
        this.isGlobal = true;
      }
      else {
        this.isGlobal = false;
      }
      var ev2 = new CustomEvent('etGlobal', { 'detail': this.isGlobal});
      document.dispatchEvent(ev2); 
    }   
  }
}
</script>

<style>	
</style>