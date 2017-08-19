/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-dataset-label">Dataset</div>
		<div class="aeris-eccad-dataset-list">
			<select v-model="selectedDataset">
	  			<option v-for="dataset in datasets" v-bind:value="dataset">
	    			{{ dataset.shortName }}
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
        datasetService: this.service,
        datasets: {type: Array},
        premier: this.first,
    	selectedDataset: {type: Object},
    	parameter: {type: Object}
    }
  },
  
  watch: {
    service (value) {
	      this.datasetService = value
	      this.refresh();
    },
    parameter (value) {
    	this.parameter = value
    	this.refresh();
    },
    selectedDataset (value) {
        if(this.premier) {
    	  EventBus.$emit('dataset', JSON.stringify(value));
    	} 
    	else {
    	  EventBus.$emit('dataset2', JSON.stringify(value));
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
  	  EventBus.$off('dataset', {});
  	}
  	else {
  	  EventBus.$off('dataset2', {});
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Dataset - Creating");
    if(this.premier) {
		EventBus.$on('parameter', data => {
		   this.parameter = JSON.parse(data);
		});
		console.log("parameter: " + JSON.stringify(this.parameter));
	} 
	else {
		EventBus.$on('parameter2', data => {
		   this.parameter = JSON.parse(data);
		});
		console.log("parameter2: " + JSON.stringify(this.parameter));
	}
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.datasetService && this.parameter && this.parameter.id) {
	  	   var url = this.datasetService  + "/" + this.parameter.id;
	  	   console.log(url);
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
        this.datasets = response.data;
        this.datasets[0].shortName = "Select";
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-Dataset - Error while accessing server:"); 
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

.aeris-eccad-dataset-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-dataset-list {
    display: inline-block;
}

.aeris-eccad-dataset-list > select {
   width: 138px;
}
	
</style>