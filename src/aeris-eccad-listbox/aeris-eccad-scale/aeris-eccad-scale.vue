/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-scale-label">Scale</div>
		<div class="aeris-eccad-scale-list">
			<select v-model="selectedScale">
	  			<option v-for="scale in scales" v-bind:value="scale">
	    			{{ scale.name }}
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
     scales : [
      {id : 1, name : "Logarithm"},
      {id : 2, name : "Lineair"}
     ],
    	selectedScale: {type: Object},
    }
  },
  
  watch: {
    selectedScale (value) {
      EventBus.$emit('scale', JSON.stringify(value));
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
    console.log("Aeris Eccad Scales - Creating");
  },
  
  computed: {
  },
  
  methods: {     
  }
}
</script>

<style>

.aeris-eccad-scale-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-scale-list {
    display: inline-block;
}

.aeris-eccad-scale-list > select {
   width: 120px;
}
	
</style>