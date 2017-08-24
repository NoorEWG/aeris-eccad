/*
 dependances: 
*/

<template>
  <!--div v-if="!hideHeader" class="headerFlex"-->
  <div class="headerFlex">
    <div class="logoWidth"><img class="img img-responsive" :src="logoLink" alt="eccad logo"/></div>
    <div class="titleWidth">
      <div class="eccadHeaderTitle titledecoration">ECCAD: Emissions of atmospheric Compounds and Compilation of Ancillary Data</div>
      <div class="eccadHeaderSubtitle">Making data accessible and providing tools for data analysis</div> 
    </div>
    <div class="authWidth">
      <a class="signIn" href="login" v-if="auth.auth == false">
        <div class="userIcon">
          <i class="fa fa-2x fa-user" aria-hidden="true"></i>
         </div>
         <div>{{auth.text}}</div>
      </a> 
      <span v-if="auth.auth == true">
        <button class="signIn" v-on="logout()"> 
          <div class="userIcon">
            <i class="fa fa-2x fa-user" aria-hidden="true"></i>
          </div>
          <div>{{auth.text}}</div>
        </button>
        <div class="signIn">{{auth.person.firstNamePerson}}</div>
      </span>  
    </div>
    
   <!--div>
     logoutModal {{logoutModal}}
      <div v-if="logoutModal">
        <input type=submit class="btn btn-sm" value="Sign out" data-ng-click="confirmLogout()"/>
        <input type=submit class="btn btn-sm" value="Back" data-ng-click="noLogout()"/>
      </div>
    </div-->  
  </div>	
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
        logoutModal: {type: Object},
        auth: {
        	auth : false,
        	person: {
        		firstNamePerson: '',
        		email: '',
        	}
        },
        eccadConfig : {
          api : "http://eccad.aeris-data.fr/eccad2web/rest/"    
        },
        hideHeader: false,
        logoLink: "http://localhost/eccad-angular/html/images/logo_eccad.png"
    }
  },
  
  watch: {
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
  },
  
  created: function () {
    console.log("Aeris Eccad Header - Creating");
    this.getCategoryGroups();
    this.getSectors();
    this.getScenarios();
    this.getSpecies();
    this.getInventories();
    this.getSpeciesGroups();
    this.getResolutions();
  },
  
  computed: {
  },
  
  methods: {
  
  getCategoryGroups: function() {
    this.$http.get(this.eccadConfig.api + "dataset/categorygroups")
    .then(function (result) {
      EventBus.$emit('catGroups', JSON.stringify(result.data));
    });   
  },
  getSectors: function() {
    this.$http.get(this.eccadConfig.api + "data/sectors")
    .then(function (result) {
      EventBus.$emit('allSectors', JSON.stringify(result.data));
    });   
  },

  getScenarios: function() {
    this.$http.get(this.eccadConfig.api + "data/scenarios")
    .then(function (result) {
      EventBus.$emit('allScenarios', JSON.stringify(result.data));
    });   
  },

  getSpecies: function() {
    this.$http.get(this.eccadConfig.api + "data/species")
    .then(function (result) {
      EventBus.$emit('allSpecies', JSON.stringify(result.data));
    });   
  },

  getInventories: function() {
    this.$http.get(this.eccadConfig.api + "data/inventories")
    .then(function (result) {
      EventBus.$emit('allInventories', JSON.stringify(result.data));
    });   
  },

  getSpeciesGroups: function() {
    this.$http.get(this.eccadConfig.api + "data/groupofspecies")
    .then(function (result) {
      EventBus.$emit('allSpeciesGroups', JSON.stringify(result.data));
    });   
  },

  getResolutions: function() {
    this.$http.get(this.eccadConfig.api + "data/resolutions")
    .then(function (result) {
      EventBus.$emit('allResolutions', JSON.stringify(result.data));
    });   
  },
      
  handleSuccess : function(response) {
     
  },
  handleError: function(response) {
  		console.log("Aeris-Eccad-Header - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
 },
 
 noLogout: function() {
   // TODO
 },
 confirmLogout: function() {
   // TODO
 }
    
 }
}
</script>

<style>

.aeris-eccad-rb-unit {
    color: navy;
}

	
</style>