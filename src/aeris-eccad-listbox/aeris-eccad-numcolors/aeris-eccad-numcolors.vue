/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-numcolors-label">Num. colors</div>
		<div class="aeris-eccad-numcolors-list">
			<select v-model="selectedNumcolors">
	  			<option v-for="numColors in numcolors" v-bind:value="numColors">
	    			{{ numColors.name }}
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
      numcolors: [
        {id : 20, name : "20"},
        {id : 10, name : "10"},
        {id : 256, name : "256"}
      ],
    	selectedNumcolors: {type: Object},
    }
  },
  
  watch: {
    selectedNumcolors (value) {
      EventBus.$emit('numColors', JSON.stringify(value));
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
    console.log("Aeris Eccad Number of Colors - Creating");
  },
  
  computed: {
  },
  
  methods: {     
  }
}
</script>

<style>

.aeris-eccad-numcolors-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-numcolors-list {
    display: inline-block;
}

.aeris-eccad-numcolors-list > select {
   width: 120px;
}
	
</style>