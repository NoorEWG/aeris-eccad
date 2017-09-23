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
    selectedMask (value) {
      if(value) {
        var ev1 = new CustomEvent('mask', { 'detail': value });
        document.dispatchEvent(ev1); 
      } 
    }
   },
  
  mounted: function () {
   this.refresh(); 
  },
  
  updated: function() {
  },
  
  destroyed: function() {
  	document.removeEventListener('category', this.setCategory);
    document.removeEventListener('category2', this.setCategory2);
    document.removeEventListener('parameter', this.setParameter);
    document.removeEventListener('parameter2', this.setParameter2);
    document.removeEventListener('dataset', this.setDataset);
    document.removeEventListener('dataset2', this.setDataset2);
  },
  
  created: function () {
    console.log("Aeris Eccad Masks - Creating");
    document.addEventListener('category', this.setCategory);
    document.addEventListener('category2', this.setCategory2);
    document.addEventListener('parameter', this.setParameter);
    document.addEventListener('parameter2', this.setParameter2);
    document.addEventListener('dataset', this.setDataset);
    document.addEventListener('dataset2', this.setDataset2);

  },
 
  computed: {
  },
  
  methods: {
  
     setCategory: function(evt) {
       if(this.first) {
        this.category = evt.detail;
       }  
    },

    setCategory2: function(evt) {
       if(!this.first) {
        this.category = evt.detail;
       }  
    },

    setParameter: function(evt) {
      if(this.first && evt.detail != null) {
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
        this.refresh();
       }  
    },

    setDataset2: function(evt) {
       if(!this.first) {
        this.dataset = evt.detail;
        this.refresh();
       }  
    },


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
          var ev2 = new CustomEvent('geospatials', { 'detail': geo.data });
          document.dispatchEvent(ev2); 
          var ev3 = new CustomEvent('allGeospatials', { 'detail': geo.data });
          document.dispatchEvent(ev3); 
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
       var ev4 = new CustomEvent('geospatials', { 'detail':this.selectedMask.legends });
       document.dispatchEvent(ev4); 
         if(this.selectedMask.maskParameter.displayName !== 'Select') {
          var maskPrefix =  this.selectedMask.maskInventory.shortName;
          var isMask = true;
          var isTotal = true;
          var parameterName = this.selectedMask.maskParameter.displayName;
          var parameterId = this.selectedMask.maskParameter.id;
          //get maskfilename
          var maskFileName = this.getMaskFileName(this.selectedMask.maskParameter.id, this.datatype.id ,this.selectedMask.maskInventory.id); 
          // var ev5 = new CustomEvent('parameterName', { 'detail': parameterName });
          // document.dispatchEvent(ev5); 
          if(this.parameter2 && this.parameter2.id) {
            // var ev6 = new CustomEvent('parameterName2', { 'detail': parameterName });
            // document.dispatchEvent(ev6); 
          }
          var ev7 = new CustomEvent('useMask', { 'detail': isMask });
          document.dispatchEvent(ev7); 
          var ev8 = new CustomEvent('setTotal', { 'detail': isTotal });
          document.dispatchEvent(ev8); 
          var ev9 = new CustomEvent('maskPrefix', { 'detail': maskPrefix });
          document.dispatchEvent(ev9); 
         

        }
        else {
          var maskFileName = "";
          var maskPrefix = "";
          var isMask = false;
          var ev10 = new CustomEvent('useMask', { 'detail': isMask });
          document.dispatchEvent(ev10); 
          var ev11 = new CustomEvent('setTotal', { 'detail': isTotal });
          document.dispatchEvent(ev11); 
          var ev12 = new CustomEvent('maskPrefix', { 'detail': maskPrefix });
          document.dispatchEvent(ev12); 
          
          if(this.parameter && this.parameter.id && this.dataset && this.dataset.id) {
            var parameterName = this.parameter.displayName;
            var parameterId = this.parameter.id;
            var tmp = this.getMaskFileName(this.parameter.id, this.datatype.id ,this.dataset.id);   
            // var ev13 = new CustomEvent('parameterName', { 'detail': parameterName });
            // document.dispatchEvent(ev13); 
          }
          if(this.parameter2 && this.parameter2.id && this.dataset2 && this.dataset2.id) {
            var parameterName2 = this.parameter2.displayName;
            var parameterId2 = this.parameter2.id;

            var tmp = this.getMaskFileName(this.parameter2.id, this.datatype2.id ,this.dataset2.id);   
            // var ev14 = new CustomEvent('parameterName2', { 'detail': parameterName2 });
            // document.dispatchEvent(ev14); 
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
                if(this.first) {
                  var ev15 = new CustomEvent('file', { 'detail': file });
                  document.dispatchEvent(ev15); 
                }
                else {
                  var ev16 = new CustomEvent('file2', { 'detail': file });
                  document.dispatchEvent(ev16); 
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