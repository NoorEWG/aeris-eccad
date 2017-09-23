/*
 dependances: 
*/


<template>
	<div v-if="hasScenario">
		<div class="aeris-eccad-scenario-label">Scenario</div>
		<div class="aeris-eccad-scenario-list">
			<select v-model="selectedScenario">
	  			<option v-for="scenario in scenarios" v-bind:value="scenario">
	    			{{ scenario.displayNameScenario }}
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
      scenarioService: this.service,
    	scenarios: {type: Array},
    	selectedScenario: {type: Object},
    	dataset: {type: Object},
    	hasScenario: false
    }
  },
  
  watch: {
    selectedScenario (value) {
      if(this.first) {
        var ev1 = new CustomEvent('scenario', { 'detail': value });
        document.dispatchEvent(ev1); 
      }
      else {
        var ev2 = new CustomEvent('scenario2', { 'detail': value });
        document.dispatchEvent(ev2); 
      }	  
    }
  },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('dataset', this.setDataset);
    document.removeEventListener('dataset2', this.setDataset2);
  },
  
  created: function () {
    console.log("Aeris Eccad Scenario - Creating");
    document.addEventListener('dataset', this.setDataset);
    document.addEventListener('dataset2', this.setDataset2);
  },

  computed: {
  },
  
  methods: {
  
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
        if (this.scenarioService && this.dataset && this.dataset.id) {
          var url = this.scenarioService  + "/" + this.dataset.id;
          this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
        }
    },
        
    handleSuccess : function(response) {
          this.scenarios = response.data;
          if(this.scenarios.length > 1) {
            this.scenarios[0].displayNameScenario = "Select"; 
            this.hasScenario = true;
            this.selectedScenario = this.scenarios[1];
          }
          else {
            this.hasScenario = false;
          }
          
          
    },
    handleError: function(response) {
        console.log("Aeris-Eccad-Scenario - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
    }
 
  }
}
</script>

<style>

.aeris-eccad-scenario-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-scenario-list {
    display: inline-block;
}

.aeris-eccad-scenario-list > select {
   width: 138px;
}
	
</style>