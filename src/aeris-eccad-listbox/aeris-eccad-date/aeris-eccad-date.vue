/*
 dependances: 
*/


<template>
  <div>
    	<div class="aeris-eccad-date-label">Date</div>
		  <div class="aeris-eccad-date-list">
        <select v-model="selectedBegindate">
          <option v-bind:value="bd" v-for="(bd, index) in beginDates">{{ bd.date}}</option>
		    </select>
        <span>-</span> 
        <select v-model="selectedEnddate">
          <option v-bind:value="ed" v-for="(ed, index) in endDates">{{ ed.date}}</option>
        </select>
		    <a class="dateIcon" @click="dateBack()"><i class="fa fa-caret-left"></i></a>
		    <a class="dateIcon" @click="dateForward()"><i class="fa fa-caret-right"></i></a>
	   </div>
  </div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    first: {
      type: Boolean,
      default: true
    }
  },
  
  data () {
    return {
       premier: this.first,
       beginDates: [],
       endDates: [],
       selectedBegindate: {},
       selectedEnddate: {},
    }
  },
  
  watch: {
    selectedBegindate (value) {
      if(value) {
        if(this.premier) {
          EventBus.$emit('beginDate', JSON.stringify(value));
        }
        else {
          EventBus.$emit('beginDate2', JSON.stringify(value));
        }	  
      }
    },
     selectedEnddate (value) {
      if(value) {
        if(this.premier) {
          EventBus.$emit('endDate', JSON.stringify(value));
        }
        else {
          EventBus.$emit('endDate2', JSON.stringify(value));
        }
      }	  
    }
  },
  
  mounted: function () {
   //this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
    if(this.premier) {
  	  EventBus.$off('beginDate', {})
      EventBus.$off('endDate', {})
  	}
  	else {
  	  EventBus.$off('beginDate2', {})
      EventBus.$off('endDate2', {})
  	}
  },
  
  created: function () {
    console.log("Aeris Eccad Grids - Creating");
    if(this.premier) {
	    EventBus.$on('beginDates', data => {
        var beginDates = JSON.parse(data);
        for(var i = 0; i < beginDates.length; i++) {
          beginDates[i].index = i;
        }
        this.beginDates = beginDates; 
        this.selectedBegindate = beginDates[0];
      });
	    EventBus.$on('endDates', data => {
		    var endDates = JSON.parse(data);
        for(var i = 0; i < endDates.length; i++) {
          endDates[i].index = i;
        }
        this.endDates = endDates;
        this.selectedEnddate = endDates[endDates.length - 1];
      });
	  } 
	  else {
	    EventBus.$on('beginDates2', data => {
		    var beginDates = JSON.parse(data);
        for(var i = 0; i < beginDates.length; i++) {
          beginDates[i].index = i;
        }
        this.beginDates = beginDates; 
        this.selectedBegindate = beginDates[0];
		  });  
	    EventBus.$on('endDates2', data => {
		    var endDates = JSON.parse(data);
        for(var i = 0; i < endDates.length; i++) {
          endDates[i].index = i;
        }
        this.endDates = endDates;
        this.selectedEnddate = endDates[endDates.length - 1];
	    });
    } 
  },
  
  computed: {
  },
  
  methods: {
   
    dateBack: function() {

    },

    dateForward: function() {

    }

  }
}
</script>

<style>

.aeris-eccad-date-label {
    font-weight: normal;
    color: navy;
    width: 35px;
    display: inline-block;
}
.aeris-eccad-date-list {
    display: inline-block;
}

.aeris-eccad-date-list > select {
   width: 75px;
   font-size: 90%;
}
	
	
</style>