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
       file: [],
       parameter: {},
       sector: {},
       sectorName: '',
       parameterName: '',
       isMask: false,
       isTotal: false,

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
    document.removeEventListener('isMask', this.setMask);
    document.removeEventListener('category', this.setCategory);
    document.removeEventListener('category2', this.setCategory2);
    document.rempveEventListener('parameter', this.setParameter);
    document.removeEventListener('parameter2', this.setParameter2);
    document.removeEventListener('dataset', this.setDataset);
    document.removeEventListener('dataset2', this.setDataset2);
	  document.removeEventListener('sector', this.setSector);
    document.removeEventListener('sector2', this.setSector2);
    document.removeEventListener('file', this.setFile);
    document.removeEventListener('file2', this.setFile2);
    document.removeEventListener('parameterName', this.setParameterName);
    document.removeEventListener('parameterName2', this.setParameterName2);
    document.removeEventListener('isTotal', this.setTotal);
	  document.removeEventListener('isTotal2', this.setTotal2);
    document.removeEventListener('sectorname', this.setSectorName);
    document.removeEventListener('sectorname2', this.setSectorName2);
  },
  
  created: function () {
    console.log("Aeris Eccad Grids - Creating");
    document.addEventListener('isMask', this.setMask);
    document.addEventListener('category', this.setCategory);
    document.addEventListener('category2', this.setCategory2);
    document.addEventListener('parameter', this.setParameter);
    document.addEventListener('parameter2', this.setParameter2);
    document.addEventListener('dataset', this.setDataset);
    document.addEventListener('dataset2', this.setDataset2);
	  document.addEventListener('sector', this.setSector);
    document.addEventListener('sector2', this.setSector2);
    document.addEventListener('file', this.setFile);
    document.addEventListener('file2', this.setFile2);
    document.addEventListener('parameterName', this.setParameterName);
    document.addEventListener('parameterName2', this.setParameterName2);
    document.addEventListener('isTotal', this.setTotal);
	  document.addEventListener('isTotal2', this.setTotal2);
    document.addEventListener('sectorname', this.setSectorName);
    document.addEventListener('sectorname2', this.setSectorName2);
  },
  
  computed: {
  },
  
  methods: {

   setCategory: function(evt) {
       if(this.first) {
        this.datatype = evt.detail;
       }  
    },

    setCategory2: function(evt) {
       if(!this.first) {
        this.datatype = evt.detail;
       }  
    },

    setParameter: function(evt) {
	   if(this.first) {
        this.parameter = evt.detail;
      } 
     },

    setParameter2: function(evt) {
       if(!this.first) {
        this.parameter = evt.detail;
       }
    },


    setDataset: function(evt) {
       if(this.first) {
        this.dataset = evt.detail;
       }  
    },

    setDataset2: function(evt) {
       if(!this.first) {
        this.dataset = evt.detail;
       }  
    }, 

  setSector: function(evt) {
       if(this.first) {
        this.sector = evt.detail;
       }  
  },
	setSector2: function(evt) {
       if(!this.first) {
        this.sector = evt.detail;
       }  
    }, 

  setFile: function(evt) {
        if(this.first) {
        this.file = evt.detail;
		this.getGrids();
       }  
    },

	setFile2: function(evt) {
       if(!this.first) {
        this.file = evt.detail;
		this.getGrids();
       }  
	  
    },

    setParameterName: function(evt) {
	   if(this.first) {
		console.log("PARAM NAME: " + JSON.stringify(evt.detail))   
        this.parameterName = evt.detail;
		this.getGrids();
       }  
    },

	setParameterName2: function(evt) {
	   if(!this.first) {
		console.log("PARAM NAME 2: " + JSON.stringify(evt.detail))   
        this.parameterName = evt.detail;
		this.getGrids();
       }  
    },

  setTotal: function(evt) { 
	  if(this.first) {
        this.isTotal = evt.detail;
        	this.getGrids();
      } 
	},   

	setTotal2: function(evt) { 
	  if(!this.first) {
        this.isTotal = evt.detail;
        	this.getGrids();
       }  
	},  

  setSectorName: function(evt) {
        if(this.first && !this.compare) {
        this.sectorName = evt.detail;
       }  
	  
    },

	setSectorName2: function(evt) {
       if(!this.first) {
        this.sectorName = evt.detail;
       }  
    },

  setMask: function(evt) {  
		this.isMask = evt.detail;
    	this.getGrids();
	},

   correctedMin: function(value) {
         // TODO
         return value;
    },   

   getGrids: function() {
     
	    console.log("GET GRIDS " + JSON.stringify(this.file) + " / " + JSON.stringify(this.sector) + " / " + JSON.stringify(this.parameterName));  
   	
      if(this.file && this.file[0] && this.file[0].id && this.sector && this.sector.id && this.parameter && this.parameterName) {    
        var grids = [];
        this.mapParams = {};
        this.$http.get("http://eccad.aeris-data.fr/eccad2web/rest/data/grids?fileid=" + this.file[0].id + "&param=" + this.parameterName + "&mask=" + this.isMask + "&total=" + this.isTotal + "&sectorid=" + this.sector.id)
            .then(function(result){

            var grids = result.data;
            // min max selection bar
            var min = grids[0].minGrid.toPrecision(4).toUpperCase();
            var max = grids[0].maxGrid.toPrecision(4).toUpperCase();
			      this.min = min;
			      this.max = max;
            var totalValue = grids[0].sumGrid.toPrecision(4);
            
            // begindates and enddates select selection bar
            var dates = [];
            grids.forEach(function(g) {
                dates.push({id : g.id, date : g.dateString});
            });

            this.beginDates = dates;
            console.log("BEGINDATES " + JSON.stringify(this.beginDates));
            this.endDates = dates;
            
            var beginDateIndex = 0;
            var selectedBegindate = this.beginDates[0];
            this.beginDate = this.selectedBegindate;
            var selectedEnddate = this.endDates[this.endDates.length-1];
			      this.endDate = this.selectedEnddate;
            
            // set mapParams
            this.mapParams.isCombine = false;
            this.mapParams.layer = this.sectorName;
            this.mapParams.colorScaleRange =  this.correctedMin(min) + "%2C" + max; 
            this.mapParams.min = this.correctedMin(min);
            this.mapParams.max = max;
            this.mapParams.time = this.beginDates[0].date;
            this.mapParams.totalValue = totalValue;
            this.mapParams.filename = this.file[0].name;
            this.mapParams.boundingBox = {latMin: -180, latMax: 180, lonMin: -90, lonMax: 90};

            console.log(JSON.stringify(this.mapParams));

            if(this.first) {
              var ev1 = new CustomEvent('mapParams', { 'detail': this.mapParams });
                  document.dispatchEvent(ev1); 
              var ev2 = new CustomEvent('min', { 'detail': min });
                  document.dispatchEvent(ev2); 
              var ev3 = new CustomEvent('max', { 'detail': max });
                  document.dispatchEvent(ev3); 
          	}
          	if(!this.first) {         
              var ev4 = new CustomEvent('mapParams2', { 'detail': this.mapParams });
                  document.dispatchEvent(ev4); 
              var ev5 = new CustomEvent('min2', { 'detail': min });
                  document.dispatchEvent(ev5); 
              var ev6 = new CustomEvent('max2', { 'detail': max });
                  document.dispatchEvent(ev6); 
		  	    }
        });      
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