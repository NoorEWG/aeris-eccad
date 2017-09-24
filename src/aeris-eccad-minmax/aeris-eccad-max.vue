/*
 dependances: 
*/
<template>
	<div>
		<div class="aeris-eccad-max-label">Max</div>
		<div class="aeris-eccad-max-list">
			<input ref="max" type="text" :value="max" disabled="disabled">
		</div>
	</div>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    first: {
      type: Boolean, 
      default: true
    },
    compare: {
      type: Boolean,
      default: false
    }
  },
  
  data () {
    return {
      max: '0',
      manual: false
    }
  },
  
  watch: {
    max (value) {
      if(this.manual) {
        if(this.compare) {
          var ev1 = new CustomEvent('manualMaxCompare', { 'detail': value });
          document.dispatchEvent(ev1); 
        }
        else {
          if(this.first) {
            var ev2 = new CustomEvent('manualMax', { 'detail': value });
            document.dispatchEvent(ev2); 
          } else {
            var ev3 = new CustomEvent('manualMax2', { 'detail': value });
            document.dispatchEvent(ev3); 
          }
        }
      }
    },
    manual (value) {
      if(value) {
        // not disabled
      }
      else {
        // set disabled
      }
    }
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  },
  
  created: function () {
    console.log("Aeris Eccad Max - Creating");
    document.addEventListener('range', this.setRange);
    document.addEventListener('max', this.setMax);
    document.addEventListener('max2', this.setMax2);
    document.addEventListener('compareResult', this.setCompareMax);
  },
  
  computed: {
  },
  
  methods: {     

     setRange: function(evt) {
       if(evt.detail === 'Manual') {
        this.manual = true;
      } else {
        this.manual = false;
      }
    },

    setMax: function(evt) {
       if(this.first && !this.compare) {
        this.max = evt.detail;
       }  
    },

    setMax2: function(evt) {
	   if(!this.first) {
        this.max = evt.detail;
       }  
    },

    setCompareMax: function(evt) {
        if(this.compare) {
        this.max = evt.detail;
      } 
    },
  }
}
</script>

<style>

.aeris-eccad-max-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-max-list {
    display: inline-block;
}

.aeris-eccad-max-list > input {
   width: 120px;
}
	
</style>