/*
 dependances: 
*/


<template>
	<div class="selectItem buttonItem">
    <div>
      <input class="drawButton" type="button" :value="drawButton"
        @click="drawMap()" v-show="showMapButton" /> 
    </div>
    <div> 
      <input class="drawButton" type="button" :value="compareButton"
        @click="drawMapCompare()" v-show="showCompareButton" />
    </div>
    <div>
      <input class="drawButton" type="button" :value="timeSeriesButton"
        @click="drawTimeSeries()" v-show="showTimeSeriesButton" />
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
      file: {},
      file2: {},
      mapcompare: {
        file: {},
        file2: {}
      },
      drawButton: 'Draw',
      compareButton: 'Compare',
      timeSeriesButton: 'Time series',
      showMapButton: true,
      showCompareButton: false,
      showTimeSeriesButton: true
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
    console.log("Aeris Eccad Draw buttons - Creating");
    EventBus.$on('toolsmenu', data => {
		   var tools = JSON.parse(data);
       
       if(tools.text === 'Map') {
         this.showCompareButton = false;
         this.showMapButton = true;
         this.showTimeSeriesButton = true;
       }
       
       if(tools.text === 'Mapcompare') {
         this.showCompareButton = true;
         this.showMapButton = false;
         this.showTimeSeriesButton = false;
       }

       if(tools.text === 'Timeseries Analysis') {
         this.showCompareButton = false;
         this.showMapButton = false;
         this.showTimeSeriesButton = false;
       }

       if(tools.text === 'Scatterplot') {
         this.showCompareButton = false;
         this.showMapButton = false;
         this.showTimeSeriesButton = false;
       }

       if(tools.text === 'Download') {
         this.showCompareButton = false;
         this.showMapButton = false;
         this.showTimeSeriesButton = false;
       }

       if(tools.text === 'Help') {
         this.showCompareButton = false;
         this.showMapButton = false;
         this.showTimeSeriesButton = false;
       }


    }); 

    EventBus.$on('file', data => {
		   this.file = JSON.parse(data);
    }); 
    EventBus.$on('file2', data => {
		   this.file2 = JSON.parse(data);
    });     
  },
  
  computed: {
  },
  
  methods: {
    
    drawMap: function() {
      if(this.file && this.file.name.length > 0) {
        EventBus.$emit('drawmap1', JSON.stringify(file));
      }
      if(this.file2 && this.file2.name.length > 0) {
        EventBus.$emit('drawmap2', JSON.stringify(file2));
      }

    },

    drawMapCompare: function() {
      if(this.checkFiles()) {
        EventBus.$emit('mapcompare', JSON.stringify(this.mapcompare));
      }  
    },

    drawTimeSeries: function() {
       if(this.checkFile()) {
        EventBus.$emit('timeseries', JSON.stringify(this.mapcompare));
      } 
    },

    checkFile: function() {
      if(this.file && this.file[0]) {
        var mapcompare = {
          file : this.file,
          file2 : this.file2
        }
        return true;
      }
      return false;
    },

    checkFiles: function() {
      if(this.file && this.file[0] && this.file2 && this.file2[0]) {
        this.mapcompare = {
          file : this.file,
          file2 : this.file2
        }
        return true;
      }
      return false;
    }
  }  
}
</script>

<style>	
</style>