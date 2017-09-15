/*
 dependances: 
*/


<template>
	<div v-if="hasSector">
		<div class="aeris-eccad-sector-label">Sector</div>
		<div class="aeris-eccad-sector-list">
			<select v-model="selectedSector">
	  			<option v-for="sector in sectors" v-bind:value="sector">
	    			{{ sector.name }}
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
    first: {
      type: Boolean,
      default: true
    }
  },
  
  data () {
    return {
      sectorService: this.service,
    	sectors: {type: Array},
    	selectedSector: {type: Object},
    	variableNameSum: String,
      premier: this.first,
    	dataset: {type: Object},
    	sector: {type: Object},
    	hasSector: false
    }
  },
  
  watch: {
    service (value) {
	      this.scenarioService = value
	      this.refresh();
    },
    dataset (value) {
    	this.dataset = value
    	this.refresh();
    },
    selectedSector (value) {
      if(this.premier) {
        EventBus.$emit('sector', JSON.stringify(value));
        EventBus.$emit('sectorname', JSON.stringify(value.variable));
      }
      else {
        EventBus.$emit('sector2', JSON.stringify(value));
        EventBus.$emit('sectorname2', JSON.stringify(value.variable));
      }	  
    }
  },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
    if(this.premier) {
  	  EventBus.$off('sector', {})
  	}
  	else {
  	  EventBus.$off('sector', {})
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Sector - Creating");
    if(this.premier) {
	    EventBus.$on('dataset', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('category', data => {
		   this.category = JSON.parse(data);
		});
		EventBus.$on('parameter', data => {
		   this.parameter = JSON.parse(data);
		});
	} 
	else {
		 EventBus.$on('dataset2', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('category2', data => {
		   this.category = JSON.parse(data);
		});
		EventBus.$on('parameter2', data => {
		   this.parameter = JSON.parse(data);
		});	
	}
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.sectorService && this.dataset && this.dataset.id && this.dataset.id > 0) {
	  	   var url = this.sectorService  + "/sectors/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
  },
  
  handleSuccess : function(response) {
        this.sectors = response.data;
        if(this.sectors.length > 1) {
        	this.hasSector = true;
          this.selectedSector = this.sectors[0];
        }
        else {
          this.hasSector = false;
        }
        
        this.$http.get(this.sectorService + "/inventorycategory/" + this.dataset.id  + "/" + this.category.id )
           .then(function (result) {                                      
            var variableNameSum = result.data.variableNameSum;
            this.sectors[0].variable = variableNameSum;
            if(this.premier) {
        	    EventBus.$emit('sectorname', JSON.stringify(variableNameSum));
      		  }
      		  else {
        		  EventBus.$emit('sectorname2', JSON.stringify(variableNameSum));
      		  }	
              console.log("SECTOR, url " + this.sectorService + "/netcdfs/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id)
              this.$http.get(this.sectorService + "/netcdfs/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id)
                .then(function (result) { 
                  var netcdfs = result.data;
        
                  this.$http.get(this.sectorService + "/files/" + netcdfs[0].id)
                    .then(function (result) { 
                       var file = result.data;
                        if(this.premier) {
        				  EventBus.$emit('file', JSON.stringify(file));
      					}
      					else {
        				  EventBus.$emit('file2', JSON.stringify(file));
      					}	     
                        //getScenarios(firstOrSecond, $rootScope.inventory2.id, $rootScope.inventory2.shortName);
                   });
             });     
        });  
  },
  
  handleError: function(response) {
  		console.log("Aeris-Eccad-Sector - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
  },
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    
  }
}
</script>

<style>

.aeris-eccad-sector-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-sector-list {
    display: inline-block;
}

.aeris-eccad-sector-list > select {
   width: 138px;
}
	
</style>
