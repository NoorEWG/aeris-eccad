/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-region-label">Region</div>
		<div class="aeris-eccad-region-list">
			<select v-model="selectedMask" @click="changeMask()">
	  			<option v-for="mask in masks" v-bind:value="mask">
	    			{{ mask.maskInventory.titre }}<span v-if="mask.maskInventory.id > 0">-{{mask.maskParameter.displayName}}</span>
	  			</option>
			</select>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    service: {
      type: String,
      default: ''
    },
  },
  
  data () {
    return {
      maskService: this.service,
    	masks: {type: Array},
    	selectedMask: {type: Object},
    }
  },
  
  watch: {
    service (value) {
	      this.maskService = value
	      this.refresh();
    },
    selectedMask (value) {
      EventBus.$emit('mask', JSON.stringify(value));	  
    }
   },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  	EventBus.$off('mask', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Masks - Creating");
  },
 
  computed: {
  },
  
  methods: {
  
    refresh: function() {
    	   if (this.maskService) {
  	  	   var url = this.maskService;
  	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
     	   }
     },
        
     handleSuccess : function(response) { 
       var masks = response.data;
       this.$http.get("http://eccad.aeris-data.fr/eccad2web/rest/data/geospatial")
         .then(function(geo) {
          EventBus.$emit('geospatials', JSON.stringify(geo.data)); 
           // transform the geospatials to regions for select
          geo.data.forEach(function(g) {
            var legend = {};
            legend.idLegend = g.idGeospatial;
            legend.nameLegend = g.fullnameGeospatial;
            legend.orderLegend = g.order;
            legend.boundingBox = {
              "latmin" : g.latminGeospatial,
              "latmax" : g.latmaxGeospatial,
              "lonmin" : g.lonminGeospatial,
              "lonmax" : g.lonmaxGeospatial
            };
            masks[0].legends.push(legend);
          });

          masks[0].maskParameter.displayName = "Select";
          this.masks = masks;
        });
     },
     
     handleError: function(response) {
    		console.log("Aeris-Eccad-Mask - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
     },

     changeMask: function() {
       EventBus.$emit('geospatials', JSON.stringify(this.selectedMask.legends));
     }
  }
}
</script>

<style>

.aeris-eccad-region-label {
    font-weight: normal;
    color: navy;
    width: 50px;
    display: inline-block;
}
.aeris-eccad-region-list {
    display: inline-block;
}

.aeris-eccad-region-list > select {
   width: 150px;
}
	
</style>