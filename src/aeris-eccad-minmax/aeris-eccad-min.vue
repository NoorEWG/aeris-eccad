/*
 dependances: 
*/
<template>
	<div>
		<div class="aeris-eccad-min-label">Min</div>
		<div class="aeris-eccad-min-list">
			<input ref="min" type="text" :value="min" disabled="disabled">
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
      min: '0',
      manual: false
    }
  },
  
  watch: {
    min (value) {
      if(this.manual) {
        if(this.compare)
          EventBus.$emit('manualMinCompare', JSON.stringify(value));
        else {
          if(this.first) {
            EventBus.$emit('manualMin', JSON.stringify(value));
        
          } else {
            EventBus.$emit('manualMin2', JSON.stringify(value));
        
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
    console.log("Aeris Eccad Min - Creating");
    EventBus.$on('range', data => {
      if(data === 'Manual') {
        this.manual = true;
      } else {
        this.manual = false;
      }
    });
    EventBus.$on('min', data => {
      if(this.first & !this.compare) {
        this.min = JSON.parse(data);
      }
    });
    EventBus.$on('min2', data => {
      if(!this.first & !this.compare) {
        this.min = JSON.parse(data);
      }
    });
    EventBus.$on('compareResult', data => {
      if(this.compare) {
        var data = JSON.parse(data)
        this.min = data.minCompare;
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

.aeris-eccad-min-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-min-list {
    display: inline-block;
}

.aeris-eccad-min-list > input {
   width: 120px;
}
	
</style>