/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-parameter-label">Parameter</div>
		<div class="aeris-eccad-parameter-list">
			<select v-model="selectedParameter">
	  			<option v-for="parameter in parameters" v-bind:value="parameter">
	    			{{ parameter.displayName }}
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
        parameterService: this.service,
        premier: this.first,
    	parameters: {type: Array},
    	selectedParameter: {type: Object},
    	category: {type: Object}
    }
  },
  
  watch: {
    service (value) {
	      this.categoryService = value
	      this.refresh();
    },
    category (value) {
    	this.category = value
    	this.refresh();
    },
    selectedParameter (value) {
      if(this.premier) {
        EventBus.$emit('parameter', JSON.stringify(value));
      }
      else {
        EventBus.$emit('parameter2', JSON.stringify(value));
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
  	  EventBus.$off('parameter', {})
  	}
  	else {
  	  EventBus.$off('parameter2', {})
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Parameter - Creating");
    if(this.premier) {
	    EventBus.$on('category', data => {
		   this.category = JSON.parse(data);
		   console.log("category is: " + JSON.stringify(this.category));
		});
	} 
	else {
		 EventBus.$on('category2', data => {
		   this.category = JSON.parse(data);
		   console.log("category2 is: " + JSON.stringify(this.category2));
		});	
	}
  },
  
 
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.parameterService && this.category && this.category.id) {
	  	   var url = this.parameterService  + "/" + this.category.id;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
        this.parameters = response.data;
        this.selectedParameter = this.parameters[0];
        
        
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-Parameter - Error while accessing server:"); 
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

.aeris-eccad-parameter-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-parameter-list {
    display: inline-block;
}

.aeris-eccad-parameter-list > select {
   width: 138px;
}
	
</style>