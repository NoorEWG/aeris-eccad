/*
 dependances: 
*/


<template>
	<span>
	<div class="aeris-eccad-category-label">Data type</div>
	<div class="aeris-eccad-category-list">
		<select v-model="selectedCategory">
  			<option v-for="category in categories" v-bind:value="category">
    			{{ category.fullName }}
  			</option>
		</select>
	</div>
	</span>
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
        categoryService: this.service,
        premier: this.first,
    	categories: {type: Array},
    	selectedCategory: {type: Object}
    }
  },
  
  watch: {
    service (value) {
	      this.categoryService = value
	      this.refresh();
    },
    selectedCategory (value) {
    	  if(this.premier) {
    	    EventBus.$emit('category', JSON.stringify(value));
    	  }
    	  else {
    	    EventBus.$emit('category2', JSON.stringify(value));
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
  	  EventBus.$off('category', {});
  	} 
  	else {
  	  EventBus.$off('category2', {});
  	}   
  },
  
  created: function () {
  console.log("Aeris Eccad Categories - Creating");
   // EventBus.$on('theme', this.handleTheme)
  },
  
 
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.categoryService) {
   	   this.$http.get(this.categoryService).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
        this.categories = response.data;
        var tempCategories = JSON.stringify(this.categories);
        EventBus.$emit('categories', tempCategories);
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-Category - Error while accessing server:"); 
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

.aeris-eccad-category-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-category-list {
    display: inline-block;
}

.aeris-eccad-category-list > select {
   width: 138px;
}
	
	
</style>