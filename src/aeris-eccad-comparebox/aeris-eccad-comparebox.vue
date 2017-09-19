/*
 dependances: 
*/


<template>
	<div class="mapCompareBox" v-show="showCompareBox">
    <div class="selectionDrawRow">
      <div class="selectText colorNavy">Arithmetic</div>
      <div>
        <select v-model="selectedOperand">
	  			<option v-for="operand in operands" v-bind:value="operand">
	    			{{ operand.name }}
	  			</option>
			</select>
      </div>
      <div class="selectText"></div>
      <div class="selectListXs">
        <input type="button" value="apply" class="applyButton" @click="applyMapCompare()" />
      </div>
    </div>
    <div class="selectionRow">    
      <div class="selectItem">
        <aeris-eccad-min compare="true"></aeris-eccad-min>
      </div>
      <div class="selectItem">  
        <aeris-eccad-max compare="true"></aeris-eccad-max>
      </div>
    </div>
  </div>  
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
      showCompareBox: false,
      operands: [
        {id: 1, sign: '+'},
        {id: 2, sign: '-'},
        {id: 3, sign: '(a)'}
      ],
      selectedOperand: {id: 1, name: '+'}
    }
  },
  
  watch: {
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() { 
  },
  
  created: function () {
    console.log("Aeris Eccad Comparebox - Creating");
    EventBus.$on('toolsmenu', data => {
		   var tools = JSON.parse(data);
       if(tools.text === 'Mapcompare') {
         this.showCompareBox = true
       }
    });     
  },
  
  computed: {
  },
  
  methods: {
    applyMapCompare: function() {   
	    EventBus.$emit('operand', JSON.stringify(this.selectedOperand))
    }
  }
}
</script>

<style>	
</style>