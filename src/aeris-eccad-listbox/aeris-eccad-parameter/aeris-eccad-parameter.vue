/*
 dependances: 
*/


<template>
	<div>
		<div class="aeris-eccad-parameter-label">Parameter</div>
		<div class="aeris-eccad-parameter-list">
			<select v-model="selectedParameter">
	  			<option v-for="parameter in parameters" v-bind:value="parameter">
	    			{{ parameter.displayName }}
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
    },
    ets: {
      type: Boolean,
      default: false
    }
  },
  
  data () {
    return {
    	parameterService: this.service,
      parameters: {type: Array},
    	selectedParameter: {type: Object},
    	category: {type: Object}
    }
  },
  
  watch: {
    selectedParameter (value) {
      if(this.first && !this.ets && value.id > 0) {
        var ev1 = new CustomEvent('parameter', { 'detail': value });
        document.dispatchEvent(ev1); 
        var ev11 = new CustomEvent('parameterName', { 'detail': value.displayName });
        document.dispatchEvent(ev11); 
      }
      if (!this.first && !this.ets && value.id > 0) {
        var ev2 = new CustomEvent('parameter2', { 'detail': value });
        document.dispatchEvent(ev2); 
        var ev21 = new CustomEvent('parameterName2', { 'detail': value.displayName });
        document.dispatchEvent(ev21); 
      }	
      if (this.ets) {
        var ev3 = new CustomEvent('etParameter', { 'detail': value });
        document.dispatchEvent(ev3); 
      }	  
    }
  },

  computed: {
  },
   
  mounted: function () {
   this.refresh(); 
  },
  
  updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('category', this.setCategory);
    document.removeEventListener('category2', this.setCategory2);	
    document.removeEventListener('etCategory', this.setCategoryEts);	
  },
  
  created: function () {
    console.log("Aeris Eccad Parameter - Creating");
    document.addEventListener('category', this.setCategory);
    document.addEventListener('category2', this.setCategory2);	
    document.addEventListener('etCategory', this.setCategoryEts);	
  },
  
  computed: {
  },
  
  methods: {
  
    setCategory (evt) {
      var category = evt.detail;
      if(this.first && !this.ets && category.id > 0) {
        this.category = category;
        this.refresh();
      }
    },

    setCategory2 (evt) {
      var category = evt.detail;
      if(!this.first && !this.ets && category.id > 0) {
        this.category = category;
        this.refresh();
      }
    },

    setCategoryEts (evt) {
      var category = evt.detail;
      if(this.emissionts && category.id > 0) {
        this.category = category;
        this.refresh();
      }
    },

    refresh: function() {
        if (this.parameterService && this.category && this.category.id) {
          var url = this.parameterService  + "/" + this.category.id;
          console.log(url)
          this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
        }
    },
        
    handleSuccess : function(response) {
          this.parameters = response.data;
          this.selectedParameter = this.parameters[0];
    },
    handleError: function(response) {
        console.log("Aeris-Eccad-Parameter - Error while accessing server:"); 
          var error = response.status;
          var message = response.statusText;
          if(!error) message = 'Can\'t connect to the server';
          console.log('Error ' + error + ': ' + message);
    },
    
    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style>

.aeris-eccad-parameter-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-parameter-list {
    display: inline-block;
}

.aeris-eccad-parameter-list > select {
   width: 138px;
}
	
</style>