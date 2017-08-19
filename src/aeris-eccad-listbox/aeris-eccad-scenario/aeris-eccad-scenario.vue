/*
 dependances: 
*/


<template>
	<div v-if="hasScenario">
		<div class="aeris-eccad-scenario-label">Scenario</div>
		<div class="aeris-eccad-scenario-list">
			<select v-model="selectedScenario">
	  			<option v-for="scenario in scenarios" v-bind:value="scenario">
	    			{{ scenario.displayNameScenario }}
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
        scenarioService: this.service,
    	scenarios: {type: Array},
    	selectedScenario: {type: Object},
    	premier: this.first,
    	dataset: {type: Object},
    	hasScenario: false
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
    selectedScenario (value) {
      if(this.premier) {
        EventBus.$emit('scenario', JSON.stringify(value));
      }
      else {
        EventBus.$emit('scenario2', JSON.stringify(value));
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
  	  EventBus.$off('scenario', {})
  	}
  	else {
  	  EventBus.$off('scenario2', {})
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Scenario - Creating");
    if(this.premier) {
	    EventBus.$on('dataset', data => {
		   this.dataset = JSON.parse(data);
		});
	} 
	else {
		 EventBus.$on('dataset2', data => {
		   this.dataset = JSON.parse(data);
		});	
	}
  },
  
 
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.scenarioService && this.dataset && this.dataset.id) {
	  	   var url = this.scenarioService  + "/" + this.dataset.id;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
        this.scenarios = response.data;
        console.log(JSON.stringify(this.scenarios));
        if(this.scenarios.length > 1) {
            this.scenarios[0].displayNameScenario = "Select"; 
        	this.hasScenario = true;
        }
        
        
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-Scenario - Error while accessing server:"); 
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

.aeris-eccad-scenario-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-scenario-list {
    display: inline-block;
}

.aeris-eccad-scenario-list > select {
   width: 138px;
}
	
</style>