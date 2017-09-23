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
      datasetService: this.service,
      datasets: {type: Array},
    	selectedDataset: {type: Object},
    	parameter: {type: Object}
    }
  },
  
  watch: {
    selectedDataset (value) {
      if(this.first) {
        var ev1 = new CustomEvent('dataset', { 'detail': value });
        document.dispatchEvent(ev1); 

        var ev2 = new CustomEvent('sectors', { 'detail': null });
        document.dispatchEvent(ev2); 
    	} 
    	else {
        var ev3 = new CustomEvent('dataset2', { 'detail': value });
        document.dispatchEvent(ev3); 

        var ev4 = new CustomEvent('sectors', { 'detail': null });
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
    document.removeEventListener('parameter', this.setParameter);
    document.removeEventListener('parameter2', this.setParameter2);
  },
  
  created: function () {
    console.log("Aeris Eccad Dataset - Creating");
    document.addEventListener('parameter', this.setParameter);
    document.addEventListener('parameter2', this.setParameter2);
  },
  
  computed: {
  },
  
  methods: {
  
    setParameter: function(evt) {
      if(this.first) {
        this.parameter = evt.detail;
        this.refresh();
      }
    },

    setParameter2: function(evt) {
      if(!this.first) {
        this.parameter = evt.detail;
        this.refresh();
      }
    },

    refresh: function() {
        if (this.datasetService && this.parameter && this.parameter.id) {
          var url = this.datasetService  + "/" + this.parameter.id;
          this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
        }
    },
        
    handleSuccess : function(response) {
          this.datasets = response.data;
          this.datasets[0].shortName = "Select";
          this.selectedDataset = this.datasets[0];
    },
    handleError: function(response) {
        console.log("Aeris-Eccad-Dataset - Error while accessing server:"); 
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