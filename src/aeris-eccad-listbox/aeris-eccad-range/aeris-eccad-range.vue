/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-range-label">Range</div>
		<div class="aeris-eccad-range-list">
			<select v-model="selectedRange">
	  			<option v-for="range in ranges" v-bind:value="range">
	    			{{ range.name }}
	  			</option>
			</select>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
      ranges: [
        {id : 1, name : "Auto"},
        {id : 2, name : "Default"},
        {id : 3, name : "Manual"}
      ], 
    	selectedRange:  {id : 1, name : "Auto"},
    }
  },
  
  watch: {
    selectedRange (value) {
      EventBus.$emit('range', JSON.stringify(value));
    }
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  	EventBus.$off('color', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Ranges - Creating");
  },
  
  computed: {
  },
  
  methods: {     
  }
}
</script>

<style>

.aeris-eccad-range-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-range-list {
    display: inline-block;
}

.aeris-eccad-range-list > select {
   width: 120px;
}
	
</style>