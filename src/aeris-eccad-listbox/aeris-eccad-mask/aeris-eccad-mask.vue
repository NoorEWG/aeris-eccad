/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-region-label">Region</div>
		<div class="aeris-eccad-region-list">
			<select v-model="selectedMask" @click="changeMask()" v-if="masks">
	  			<option v-for="mask in masks" v-bind:value="mask">
	    			{{ mask.maskInventory.titre }}<span v-if="mask.maskInventory.id > 0">-{{mask.maskParameter.displayName}}</span>
	  			</option>
			</select>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    service: {
      type: String,
      default: ''
    },
  },
  
  data () {
    return {
      maskService: this.service,
    	masks: [],
    	selectedMask: {type: Object},
      datatype: {type: Object},
      dataset: {type: Object},
      parameter: {type: Object},
      datatype2: {type: Object},
      dataset2: {type: Object},
      parameter2: {type: Object},
      eccadConfig: {
        api: 'http://eccad.aeris-data.fr/eccad2web/rest/'
      }
    }
  },
  
  watch: {
    service (value) {
	      this.maskService = value
	      this.refresh();
    },
    selectedMask (value) {
      if(value) {
        EventBus.$emit('mask', JSON.stringify(value));	 
      } 
    }
   },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  	EventBus.$off('mask', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Masks - Creating");
    EventBus.$on('dataset', data => {
	    this.dataset = JSON.parse(data);
	  });
		EventBus.$on('category', data => {
			this.datatype = JSON.parse(data);
		});
		EventBus.$on('parameter', data => {
			this.parameter = JSON.parse(data);
		});
    EventBus.$on('dataset2', data => {
	    this.dataset2 = JSON.parse(data);
	  });
		EventBus.$on('category2', data => {
			this.datatype2 = JSON.parse(data);
		});
		EventBus.$on('parameter2', data => {
			this.parameter2 = JSON.parse(data);
		});

  },
 
  computed: {
  },
  
  methods: {
  
    refresh: function() {
    	   if (this.maskService) {
  	  	   var url = this.maskService;
  	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
     	   }
     },
        
     handleSuccess : function(response) { 
       
      var masks = response.data;
      this.$http.get(this.eccadConfig.api + 'data/geospatial')
        .then(function(geo) {
          EventBus.$emit('geospatials', JSON.stringify(geo.data)); 
          EventBus.$emit('allGeospatials', JSON.stringify(geo.data)); 
          // transform the geospatials to regions for select
          geo.data.forEach(function(g) {
            var legend = {};
            legend.idLegend = g.idGeospatial;
            legend.nameLegend = g.fullnameGeospatial;
            legend.orderLegend = g.order;
            legend.boundingBox = {
              "latmin" : g.latminGeospatial,
              "latmax" : g.latmaxGeospatial,
              "lonmin" : g.lonminGeospatial,
              "lonmax" : g.lonmaxGeospatial
            };
            masks[0].legends.push(legend);
          });

          masks[0].maskParameter.displayName = "Select";
          this.masks = masks;
          this.selectedMask = masks[0];
        });
     },
     
     handleError: function(response) {
    		console.log("Aeris-Eccad-Mask - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
     },

     changeMask: function() {
       
       console.log("MASK, selectedmask " + JSON.stringify(this.selectedMask.maskInventory))
       EventBus.$emit('geospatials', JSON.stringify(this.selectedMask.legends));
        if(this.selectedMask.maskParameter.displayName !== 'Select') {
          var maskPrefix =  this.selectedMask.maskInventory.shortName;
          var isMask = true;
          var isTotal = true;
          var parameterName = this.selectedMask.maskParameter.displayName;
          var parameterId = this.selectedMask.maskParameter.id;
          //get maskfilename
          var maskFileName = this.getMaskFileName(this.selectedMask.maskParameter.id, this.datatype.id ,this.selectedMask.maskInventory.id); 
          EventBus.$emit('parameterName', JSON.stringify(parameterName));
          if(this.parameter2 && this.parameter2.id) {
            EventBus.$emit('parameterName2', JSON.stringify(parameterName2));
          }
          EventBus.$emit('useMask', JSON.stringify(isMask));
          EventBus.$emit('setTotal', JSON.stringify(isTotal));
          EventBus.$emit('maskPrefix', JSON.stringify(maskPrefix));

        }
        else {
          var maskFileName = "";
          var maskPrefix = "";
          var isMask = false;
          EventBus.$emit('useMask', JSON.stringify(isMask));
          EventBus.$emit('setTotal', JSON.stringify(isTotal));
          EventBus.$emit('maskPrefix', JSON.stringify(maskPrefix));
          
          if(this.parameter && this.parameter.id && this.dataset && this.dataset.id) {
            var parameterName = this.parameter.displayName;
            var parameterId = this.parameter.id;
            var tmp = this.getMaskFileName(this.parameter.id, this.datatype.id ,this.dataset.id);   
            EventBus.$emit('parameterName', JSON.stringify(parameterName));
          }
          if(this.parameter2 && this.parameter2.id && this.dataset2 && this.dataset2.id) {
            var parameterName2 = this.parameter2.displayName;
            var parameterId2 = this.parameter2.id;

            var tmp = this.getMaskFileName(this.parameter2.id, this.datatype2.id ,this.dataset2.id);   
            EventBus.$emit('parameterName2', JSON.stringify(parameterName2));
          }
        }
     },

     getMaskFileName: function(parameterId, categoryId, inventoryId) {

        var url = this.eccadConfig.api +  "data/netcdfs/" + parameterId + "/" + categoryId + "/" + inventoryId;
        console.log("MASK, url " + url)
        this.$http.get(this.eccadConfig.api +  "data/netcdfs/" + parameterId + "/" + categoryId + "/" + inventoryId)
          .then( function(result) {
            var netcdfs = result.data;
      
            this.$http.get(this.eccadConfig.api + "data/files/" + netcdfs[0].id)
              .then(function (result) { 
                var file = result.data;
                if(this.premier) {
                  EventBus.$emit('file', JSON.stringify(file));
                }
                else {
                  EventBus.$emit('file2', JSON.stringify(file));
                }	     
              });
          });  
     }
  }
}
</script>

<style>

.aeris-eccad-region-label {
    font-weight: normal;
    color: navy;
    width: 50px;
    display: inline-block;
}
.aeris-eccad-region-list {
    display: inline-block;
}

.aeris-eccad-region-list > select {
   width: 150px;
}
	
</style>