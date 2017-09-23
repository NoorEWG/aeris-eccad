/*
 dependances: 
*/


<template>
	<div v-if="hasSector">
		<div class="aeris-eccad-sector-label">Sector</div>
		<div class="aeris-eccad-sector-list">
			<select v-model="selectedSector">
	  			<option v-for="sector in sectors" v-bind:value="sector">
	    			{{ sector.name }}
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
    first: {
      type: Boolean,
      default: true
    }
  },
  
  data () {
    return {
      sectorService: this.service,
    	sectors: {type: Array},
    	selectedSector: {type: Object},
    	variableNameSum: String,
    	dataset: {type: Object},
    	sector: {type: Object},
    	hasSector: false
    }
  },
  
  watch: {
    selectedSector (value) {
      if(this.first) {
        var ev1 = new CustomEvent('sector', { 'detail': value });
        document.dispatchEvent(ev1); 
        
        var ev2 = new CustomEvent('sectorname', { 'detail': value.variable });
        document.dispatchEvent(ev2); 
      }
      else {
        var ev3 = new CustomEvent('sector2', { 'detail': value });
        document.dispatchEvent(ev3); 
        
        var ev4 = new CustomEvent('sectorname2', { 'detail': value.variable });
        document.dispatchEvent(ev4); 
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
    console.log("Aeris Eccad Sector - Creating");
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
  	   if (this.sectorService && this.dataset && this.dataset.id && this.dataset.id > 0) {
	  	   var url = this.sectorService  + "/sectors/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
    },
  
    handleSuccess : function(response) {
        this.sectors = response.data;
        if(this.sectors.length > 1) {
        	this.hasSector = true;
          this.selectedSector = this.sectors[0];
        }
        else {
          this.hasSector = false;
        }
        
        this.$http.get(this.sectorService + "/inventorycategory/" + this.dataset.id  + "/" + this.category.id )
           .then(function (result) {                                      
            var variableNameSum = result.data.variableNameSum;
            this.sectors[0].variable = variableNameSum;
            if(this.first) {
              var ev1 = new CustomEvent('sectorname', { 'detail': variableNameSum });
              document.dispatchEvent(ev1); 
      		  }
      		  else {
        		  var ev2 = new CustomEvent('sectorname2', { 'detail': variableNameSum });
              document.dispatchEvent(ev2); 
      		  }	
              console.log("SECTOR, url " + this.sectorService + "/netcdfs/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id)
              this.$http.get(this.sectorService + "/netcdfs/" + this.parameter.id  + "/" + this.category.id + "/" + this.dataset.id)
                .then(function (result) { 
                  var netcdfs = result.data;
        
                  if(netcdfs.length > 0) {
                    this.$http.get(this.sectorService + "/files/" + netcdfs[0].id)
                      .then(function (result) { 
                        var file = result.data;
                        if(this.premier) {
                          var ev3 = new CustomEvent('file', { 'detail': file });
                          document.dispatchEvent(ev3); 
                        }
                        else {
                          var ev4 = new CustomEvent('file2', { 'detail': file });
                          document.dispatchEvent(ev4); 
                        }	     
                    });
                  } 
             });     
        });  
    },
  
    handleError: function(response) {
        console.log("Aeris-Eccad-Sector - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
    },
  }
}
</script>

<style>

.aeris-eccad-sector-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-sector-list {
    display: inline-block;
}

.aeris-eccad-sector-list > select {
   width: 138px;
}
	
</style>
