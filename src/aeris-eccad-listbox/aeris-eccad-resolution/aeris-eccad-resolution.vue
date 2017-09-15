/*
 dependances: 
*/


<template>
	<div v-if="!isGeo">
		<div class="aeris-eccad-resolution-label">Resolution</div>
		<div class="aeris-eccad-resolution-list">
			<select v-model="selectedResolution">
	  			<option v-for="resolution in resolutions" v-bind:value="resolution">
	    			{{ resolution.fullNameResolution }}
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
      resolutionService: this.service,
    	resolutions: {type: Array},
    	selectedResolution: {type: Object},
    	premier: this.first,
    	dataset: {type: Object},
    	isGeo: false
    }
  },
  
  watch: {
    service (value) {
	      this.resolutionService = value
	      this.refresh();
    },
    dataset (value) {
    	this.dataset = value
    	this.refresh();
    },
    selectedResolution (value) {
      if(value != null) {
        if(this.premier) {
          EventBus.$emit('resolution', JSON.stringify(value));
        }
        else {
          EventBus.$emit('resolution2', JSON.stringify(value));
        }
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
  	  EventBus.$off('resolution', {});
  	}
  	else {
  	  EventBus.$off('resolution2', {});
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Resolution - Creating");
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
  	   if (this.resolutionService && this.dataset && this.dataset.id) {
         var url = this.resolutionService  + "/" +this.dataset.id;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
  },
      
  handleSuccess : function(response) {
    this.resolutions = response.data;
    if(this.resolutions.length > 0) {
      this.selectedResolution = this.resolutions[0];
      if(this.premier) {
        EventBus.$emit('resolution', JSON.stringify(value));
      }
      else {
        EventBus.$emit('resolution2', JSON.stringify(value));
      }	  
    } 
  },
  
  handleError: function(response) {
  		console.log("Aeris-Eccad-Resolution - Error while accessing server:"); 
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

.aeris-eccad-resolution-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-resolution-list {
    display: inline-block;
}

.aeris-eccad-resolution-list > select {
   width: 138px;
}
	
</style>