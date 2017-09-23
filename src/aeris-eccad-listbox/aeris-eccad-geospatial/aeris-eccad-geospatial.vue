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
    selectedGeospatial (value) {
      if(value) {
        var ev1 = new CustomEvent('geospatial', { 'detail': value });
        document.dispatchEvent(ev1);  
      } 
    }
   },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  	 document.removeEventListener('geospatials', this.setGeospatials);
  },
  
  created: function () {
    console.log("Aeris Eccad Geospatials - Creating");
    document.addEventListener('geospatials', this.setGeospatials);
    
  },
 
  computed: {
  },
  
  methods: {
  
    setGeospatials: function(evt) {
      this.geospatials = evt.detail
    },

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
        this.selectedGeospatial = this.geospatials[0];
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
    width: 50px;
    display: inline-block;
}
.aeris-eccad-geospatial-list {
    display: inline-block;
}

.aeris-eccad-geospatial-list > select {
   width: 150px;
}
	
</style>