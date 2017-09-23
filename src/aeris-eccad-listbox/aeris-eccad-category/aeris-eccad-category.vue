/*
 dependances: 
*/


<template>
	<span>
	<div class="aeris-eccad-category-label">Data type</div>
	<div class="aeris-eccad-category-list">
		<select v-model="selectedCategory">
  			<option v-for="category in categories" v-bind:value="category">
    			{{ category.fullName }}
  			</option>
		</select>
	</div>
	</span>
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
    },
    its: {
      type: Boolean,
      default: false
    }
  },
  
  data () {
    return {
        categoryService: this.service,
        premier: this.first,
    	  categories: {type: Array},
    	  selectedCategory: {type: Object}
    }
  },
  
  watch: {
    service (value) {
	      this.categoryService = value
	      this.refresh();
    },
    selectedCategory (value) {
    	  
        if(this.premier && !this.ets && !this.its) {
    	    var ev1 = new CustomEvent('category', { 'detail': value });
          document.dispatchEvent(ev1); 
    	  }
    	  if(!this.premier) {
          var ev2 = new CustomEvent('category2', { 'detail': value });
          document.dispatchEvent(ev2); 
    	  }
        if (this.ets) {
          var ev3 = new CustomEvent('etCategory', { 'detail': value });
          document.dispatchEvent(ev3); 
    	  }
        if (this.its) {
          var ev4 = new CustomEvent('itCategory', { 'detail': value });
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
  },
  
  created: function () {
  console.log("Aeris Eccad Categories - Creating");
   // EventBus.$on('theme', this.handleTheme)
  },
  
  computed: {
  },
  
  methods: {
  
    refresh: function() {
        if (this.categoryService) {
        this.$http.get(this.categoryService).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
        }
    },
        
    handleSuccess : function(response) {
      var categories = response.data;
      for(var i = 0; i < categories.length; i++) {
        categories[i].fullName = this.capitalizeFirstLetter(categories[i].fullName)
      }
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      var ev5 = new CustomEvent('categories', { 'detail': response.data });
      document.dispatchEvent(ev5); 
    },

    handleError: function(response) {
      console.log("Aeris-Eccad-Category - Error while accessing server:"); 
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

.aeris-eccad-category-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-category-list {
    display: inline-block;
}

.aeris-eccad-category-list > select {
   width: 138px;
}
	
	
</style>