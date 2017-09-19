/*
 dependances: 
*/


<template>
	<div class="geospatial">
					<div>
						<div>
							W<input type="text" :value="geospatial.boundingBox.lonmin" />
						</div>
					</div>
					<div>
						<div>
							N<input type="text" :value="geospatial.boundingBox.latmax"/>
						</div>
						<div>
							S<input type="text" :value="geospatial.boundingBox.latmin"/>
						</div>
					</div>
					<div>
						<div>
							E<input type="text" :value="geospatial.boundingBox.lonmax" />
						</div>
					</div>
				</div>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    datasearch: {type: Boolean, default: false}
  },
  
  data () {
    return {
      geospatial: {
        boundingBox : {
          latmin : -180,
          latmax : 180,
          lonmin : -90,
          lonmax : 90
        }
      },
      lonMin : -90,
      lonMax : 90,
      latMin : -180,
      latMax : 180
    }
  },
  
  watch: {
    lonMax (value) {
      if(!this.datasearch) {
	      EventBus.$emit('lonMaxR', JSON.stringify(value))
      }
    },
    lonMin (value) {
      if(!this.datasearch) {
	      EventBus.$emit('lonMinR', JSON.stringify(value))
      }  
    },
    latMax (value) {
	    if(!this.datasearch) {
        EventBus.$emit('latMaxR', JSON.stringify(value))
      }
    },
    latMin (value) {
	    if(!this.datasearch) {
        EventBus.$emit('latMinR', JSON.stringify(value))
      }  
    },
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  },
  
  created: function () {
    console.log("Aeris Eccad Boundingbox - Creating");
    EventBus.$on('inventoryGeospatial', data => {
		  this.geospatial = JSON.parse(data);
		});
    EventBus.$on('geospatial', data => {
		  var geospatial = JSON.parse(data);
      this.lonMax = geospatial.boundingBox.lonmax;
      this.lonMin = geospatial.boundingBox.lonmin;
      this.latMax = geospatial.boundingBox.latmax;
      this.latMin = geospatial.boundingBox.latmin;
      this.geospatial = geospatial;
		});
  },
  
  computed: {
  },
  
  methods: {
  }
}
</script>

<style>	
</style>