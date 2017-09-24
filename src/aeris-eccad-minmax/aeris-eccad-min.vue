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
        if(this.compare) {
          var ev1 = new CustomEvent('manualMinCompare', { 'detail': value });
          document.dispatchEvent(ev1); 
        }
        else {
          if(this.first) {
            var ev2 = new CustomEvent('manualMin', { 'detail': value });
            document.dispatchEvent(ev2); 
          } else {
            var ev3 = new CustomEvent('manualMin2', { 'detail': value });
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
    document.removeEventListener('range', this.setRange);
    document.removeEventListener('min', this.setMin);
    document.removeEventListener('min2', this.setMin2);
    document.removeEventListener('compareResult', this.setCompareMin);
  },
  
  created: function () {
    console.log("Aeris Eccad Min - Creating");    
    document.addEventListener('range', this.setRange);
    document.addEventListener('min', this.setMin);
    document.addEventListener('min2', this.setMin2);
    document.addEventListener('compareResult', this.setCompareMin);
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

    setMin: function(evt) {
       if(this.first && !this.compare) {
        this.min = evt.detail;
       }  
    },

    setMin2: function(evt) {
	   if(!this.first) {
        this.min = evt.detail;
       }  
    },

    setCompareMin: function(evt) {
        if(this.compare) {
        this.min = evt.detail;
      } 
    },

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