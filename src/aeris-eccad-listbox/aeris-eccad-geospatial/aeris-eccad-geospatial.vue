/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-geospatial-label">Zoom</div>
		<div class="aeris-eccad-geospatial-list">
			<select v-model="selectedGeospatial">
	  			<option v-for="geospatial in geospatials" v-bind:value="geospatial">
	    			{{ geospatial.nameLegend }}
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
      geospatialService: this.service,
    	geospatials: {type: Array},
    	selectedGeospatial: {type: Object},
    }
  },
  
  watch: {
    service (value) {
	      this.geospatialService = value
	      this.refresh();
    },
    selectedGeospatial (value) {
      if(value) {
        EventBus.$emit('geospatial', JSON.stringify(value));	 
      } 
    }
   },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  	EventBus.$off('geospatial', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Geospatials - Creating");
    EventBus.$on('geospatials', data => {
      this.geospatials = JSON.parse(data);
    });
  },
 
  computed: {
  },
  
  methods: {
  
    refresh: function() {
    	   if (this.geospatialService) {
  	  	   var url = this.geospatialService;
  	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
     	   }
     },
        
     handleSuccess : function(response) { 
        var geospatials = [];
        response.data.forEach(function(g) {
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
          geospatials.push(legend);
        });
        this.geospatials = geospatials;
     },
     
     handleError: function(response) {
    		console.log("Aeris-Eccad-Geospatials - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
     },
  }
}
</script>

<style>

.aeris-eccad-geospatial-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-geospatial-list {
    display: inline-block;
}

.aeris-eccad-geospatial-list > select {
   width: 138px;
}
	
</style>