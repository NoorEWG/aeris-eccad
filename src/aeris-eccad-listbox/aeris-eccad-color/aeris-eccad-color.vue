/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-color-label">Colors</div>
		<div class="aeris-eccad-color-list">
			<select v-model="selectedColor">
	  			<option v-for="color in colors" v-bind:value="color">
	    			{{ color.name }}
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
      colorService: this.service,
    	colors: {type: Array},
    	selectedColor: {type: Object},
    }
  },
  
  watch: {
    service (value) {
	      this.colorService = value
	      this.refresh();
    },
    selectedColor (value) {
      EventBus.$emit('color', JSON.stringify(value));
    }
  },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  	EventBus.$off('color', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Colors - Creating");
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.colorService) {
	  	   var url = this.colorService;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
  },
      
  handleSuccess : function(response) {
    this.colors = response.data;
  },
  
  handleError: function(response) {
  	console.log("Aeris-Eccad-Color - Error while accessing server:"); 
    var error = response.status;
    var message = response.statusText;
    if(!error) message = 'Can\'t connect to the server';
    console.log('Error ' + error + ': ' + message);
  },
     
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
   width: 138px;
}
	
</style>