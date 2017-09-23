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
export default {
  props: {
    first: {
      type: Boolean,
      default: true
    }
  },
  
  data () {
    return {
       beginDates: [],
       endDates: [],
       selectedBegindate: {},
       selectedEnddate: {},
    }
  },
  
  watch: {
    selectedBegindate (value) {
      if(value) {
        if(this.first) {
          var ev1 = new CustomEvent('beginDate', { 'detail': value });
          document.dispatchEvent(ev1); 
        }
        else {
          var ev2 = new CustomEvent('beginDate2', { 'detail': value });
          document.dispatchEvent(ev2);
        }	  
      }
    },
     selectedEnddate (value) {
      if(value) {
        if(this.first) {
          var ev3 = new CustomEvent('endDate', { 'detail': value });
          document.dispatchEvent(ev3); 
        }
        else {
          var ev4 = new CustomEvent('endDate2', { 'detail': value });
          document.dispatchEvent(ev4); 
        }
      }	  
    }
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('beginDates', this.setBeginDates);
    document.removeEventListener('endDates', this.setEndDates);
    document.removeEventListener('beginDates2', this.setBeginDates2);
    document.removeEventListener('endDates2', this.setEndDates2);
  },
  
  created: function () {
    console.log("Aeris Eccad Grids - Creating");
    document.addEventListener('beginDates', this.setBeginDates);
    document.addEventListener('endDates', this.setEndDates);
    document.addEventListener('beginDates2', this.setBeginDates2);
    document.addEventListener('endDates2', this.setEndDates2);
  },
  
  computed: {
  },
  
  methods: {
   
    setBeginDates: function(evt) {
		  console.log("DATE, first = " + this.first)
      if(this.first) {
        var beginDates = evt.detail;
        for(var i = 0; i < beginDates.length; i++) {
          beginDates[i].index = i;
        }
        this.beginDates = beginDates; 
        this.selectedBegindate = beginDates[0];
      }
    },
    
    setBeginDates2: function(evt) {
		  console.log("DATE2, first = " + this.first)
      if(!this.first) {
        var beginDates = evt.detail;
        for(var i = 0; i < beginDates.length; i++) {
          beginDates[i].index = i;
        }
        this.beginDates = beginDates; 
        this.selectedBegindate = beginDates[0];
      }  
    },

    setEndDates: function(evt) {
		  if(this.first) {
        var endDates = evt.detail;
        for(var i = 0; i < endDates.length; i++) {
          endDates[i].index = i;
        }
        this.endDates = endDates;
        this.selectedEnddate = endDates[endDates.length - 1];
      }
    },
    
    setEndDates2: function(evt) {
		  if(!this.first) {
        var endDates = evt.detail;
        for(var i = 0; i < endDates.length; i++) {
          endDates[i].index = i;
        }
        this.endDates = endDates;
        this.selectedEnddate = endDates[endDates.length - 1];
      }
    },

    dateBack: function() {
      var index = 0;
      for(var i = 0; i < this.beginDates.length ; i++) {
        if(this.selectedBegindate.id === this.beginDates[i].id) {
          index = i;
          break;
        }
      }
      if(index > 0) {
        this.selectedBegindate = this.beginDates[index-1];
      }
      else {
        this.selectedBegindate = this.beginDates[0];    
      }

    },

    dateForward: function() {
       var index = this.beginDates.length - 1;
      for(var i = 0; i < this.beginDates.length ; i++) {
        if(this.selectedBegindate.id === this.beginDates[i].id) {
          index = i;
          break;
        }
      }
      if(index < this.beginDates.length - 1) {
        this.selectedBegindate = this.beginDates[index+1];
      }
      else {
        this.selectedBegindate = this.beginDates[this.beginDates.length - 1];
      }
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