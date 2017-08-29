/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-rb-unit">
			<input type="radio" name="ft">{{flux}}</input> 
		</div>
		<div class="aeris-eccad-rb-unit">
			<input type="radio" name="ft">{{total}}</input> 
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
        unitService: this.service,
    	selectedUnit: {type: String},
    	premier: this.first,
    	dataset: {type: Object},
    	category: {type: Object},
    	unit: {type: Object},
    	flux: "flux",
        total: "total"
    }
  },
  
  watch: {
    service (value) {
	      this.unitService = value
	      this.refresh();
    },
    dataset (value) {
    	this.dataset = value
    	this.refresh();
    },
    category (value) {
    	this.category = value
    	this.refresh();
    },
    selectedUnit (value) {
      if(this.premier) {
        EventBus.$emit('unitName', JSON.stringify(value));
      }
      else {
        EventBus.$emit('unitName2', JSON.stringify(value));
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
  	  EventBus.$off('unit', {})
  	}
  	else {
  	  EventBus.$off('unit2', {})
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad RadioButton Unit - Creating");
    if(this.premier) {
	    EventBus.$on('dataset', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('category', data => {
		   this.category = JSON.parse(data);
		});
	} 
	else {
		 EventBus.$on('dataset2', data => {
		   this.dataset = JSON.parse(data);
		});
		 EventBus.$on('category2', data => {
		   this.category = JSON.parse(data);
		});	
	}
    
    
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.unitService && this.dataset && this.dataset.id && this.dataset.id > 0 && this.category && this.category.id && this.category.id > 0) {
	  	   var url = this.unitService  + "/" + this.dataset.id + "/" + this.category.id;
	  	   console.log(url);
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
      this.unit = response.data;
      this.flux = this.unit.totalDisplayname + " (" + this.unit.totalShortname + ")";
      this.total = this.unit.displayname + " (" + this.unit.shortname +")";
      console.log(this.flux);
      console.log(this.total);
      if(this.premier) {
        EventBus.$emit('unit', JSON.stringify(this.unit));
      }
      else {
        EventBus.$emit('unit2', JSON.stringify(this.unit));
      }	  
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-RadioButton-Unit - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
 }
    
 }
}
</script>

<style>

.aeris-eccad-rb-unit {
    color: navy;
}

	
</style>
