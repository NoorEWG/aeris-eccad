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
        if(this.compare)
          EventBus.$emit('manualMaxCompare', JSON.stringify(value));
        else {
          if(this.first) {
            EventBus.$emit('manualMax', JSON.stringify(value));
        
          } else {
            EventBus.$emit('manualMax2', JSON.stringify(value));
        
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
    EventBus.$on('range', data => {
      if(data === 'Manual') {
        this.manual = true;
      } else {
        this.manual = false;
      }
    });
    EventBus.$on('max', data => {
      if(this.first & !this.compare) {
        this.max = JSON.parse(data);
      }
    });
    EventBus.$on('max2', data => {
      if(!this.first & !this.compare) {
        this.max = JSON.parse(data);
      }
    });
  EventBus.$on('compareResult', data => {
      if(this.compare) {
        var data = JSON.parse(data)
        this.max = data.maxCompare;
      }
    });
  },
  
  computed: {
  },
  
  methods: {     
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