/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-dataset-label">Dataset</div>
		<div class="aeris-eccad-dataset-list">
			<select v-model="selectedDataset">
	  			<option v-for="dataset in datasets" v-bind:value="dataset">
	    			{{ dataset.shortName }}
	  			</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
  props: {
  },
  
  data () {
    return {
      datasets: {type: Array},
    	selectedDataset: {type: Object},
      category: {}
    }
  },
  
  watch: {
    service (value) {
	      this.datasetService = value
	      this.refresh();
    },
    selectedDataset (value) {
      var ev1 = new CustomEvent('itDataset', { 'detail': value });
      document.dispatchEvent(ev1); 
    }  
  },
  
  mounted: function () {
     this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  	document.removeEventListener('itCategory', this.setCategory);
  },
  
  created: function () {
    console.log("Aeris Eccad Inventory Time Series Dataset - Creating");
    document.addEventListener('itCategory', this.setCategory);
  },
  
  computed: {
  },
  
  methods: {
  
    setCategory: function(evt) {
      this.category = evt.detail;
      this.refresh();
    },

    refresh: function() {
        if (this.category && this.category.id > 0) {
          var url = 'http://eccad.aeris-data.fr/eccad2web/rest/data/inventoriesbycategory?categoryid='+ this.category.id;
          this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
        }
    },
        
    handleSuccess : function(response) {
          this.datasets = response.data;
          this.datasets[0].shortName = "Select";
          this.selectedDataset = this.datasets[0];
    },
    handleError: function(response) {
        console.log("Aeris-Eccad-Inventory-TimeSeries-Dataset - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
    },  
  }
}
</script>

<style>

.aeris-eccad-dataset-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-dataset-list {
    display: inline-block;
}

.aeris-eccad-dataset-list > select {
   width: 138px;
}
	
</style>