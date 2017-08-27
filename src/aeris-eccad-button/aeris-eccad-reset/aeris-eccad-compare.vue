/*
 dependances: 
*/


<template>
	<div class="selectionRow"> 
    <div class="selectItem">
		  <div class="aeris-eccad-reset">
			  <input type="radio" name="reset" @click="reset" >Reset</input> 
		  </div>
		</div>
    <div class="selectItem">
		  <div class="aeris-eccad-reset-compare">
			  <input type="radio" name="resetcompare" @click="resetCompare" >{{ resetcompare.text }}</input> 
		  </div>
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
      compare: 'Compare',
      hideCompare: 'Hide compare',  
      reset:false, 
      resetcompare: {
        reset: false,
        text: 'Compare'
      }
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
    console.log("Aeris Eccad ResetCompare- Creating");
 
  },
  
  computed: {
  },
  
  methods: {
    
    reset:function(){    
      EventBus.$emit('resetselection', JSON.stringify(true));
    },

    resetCompare:function(){   
      if(this.resetcompare.text === this.compare) {
        EventBus.$emit('resetCompare', JSON.stringify(true));
        this.resetcompare.text = this.hideCompare
      }  
      else {
        this.resetcompare.text = this.compare;
      }
    }
  }  
}
</script>

<style>

.aeris-eccad-reset {
  color: navy;
  margin-right: 5px;
}
.aeris-eccad-reset-compare {
  color: navy;
  margin-right: 5px;
}

	
</style>