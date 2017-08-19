/*
 dependances: 
*/


<template>
  <div>
    	<div class="aeris-eccad-date-label">Date</div>
		  <div class="aeris-eccad-date-list">
        <select>
          <option v-bind:value="selectedBegindate" v-for="bd in beginDates" v-on:click="beginDateChanged()">{{ bd.date}}</option>
		    </select>
        <span>-</span> 
        <select>
          <option v-bind:value="selectedEnddate" v-for="ed in endDates" v-on:click="endDateChanged()">{{ ed.date}}</option>
        </select>
		    <a class="dateIcon" v-on:click="dateBack()"><i class="fa fa-caret-left"></i></a>
		    <a class="dateIcon" v-on:click="dateForward()"><i class="fa fa-caret-right"></i></a>
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
       selectedBegindate: '',
       selectedEnddate: ''
    }
  },
  
  watch: {
    selectedBegindate (value) {
      if(this.premier) {
        EventBus.$emit('beginDate', JSON.stringify(value));
      }
      else {
        EventBus.$emit('beginDate2', JSON.stringify(value));
      }	  
    },
     selectedEnddate (value) {
      if(this.premier) {
        EventBus.$emit('endDate', JSON.stringify(value));
      }
      else {
        EventBus.$emit('endDate2', JSON.stringify(value));
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
		    this.beginDates = JSON.parse(data);
      });
		  console.log("begindates : " + JSON.stringify(this.beginDates));
	    EventBus.$on('endDates', data => {
		    this.endDates = JSON.parse(data);
      });
	  } 
	  else {
	    EventBus.$on('beginDates2', data => {
		    this.beginDates = JSON.parse(data);
		  });  
      console.log("begindates2 : " + JSON.stringify(this.beginDates));
	    EventBus.$on('endDates2', data => {
		    this.endDates = JSON.parse(data);
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