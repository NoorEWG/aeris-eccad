/*
 dependances: 
*/

<template>
  <div v-if="!hideHeader" class="headerFlex">
      <div class="logoWidth"><img class="img img-responsive" :src="logoLink" alt="eccad logo"/></div>
      <div class="titleWidth">
        <div class="eccadHeaderTitle titledecoration">ECCAD: Emissions of atmospheric Compounds and Compilation of Ancillary Data</div>
        <div class="eccadHeaderSubtitle">Making data accessible and providing tools for data analysis</div> 
      </div>
      <div class="authWidth">
        <a class="signIn" href="" v-if="auth === false" @click="login">
          <div class="userIcon">
            <i class="fa fa-2x fa-user" aria-hidden="true"></i>
           </div>
           <div>{{signInText}}</div>
        </a> 
        <span v-if="auth == true">
          <button class="signIn" @click="logout"> 
            <div class="userIcon">
              <i class="fa fa-2x fa-user" aria-hidden="true"></i>
            </div>
            <div>{{signInText}}</div>
          </button>
          <div class="signIn">{{user.firstNamePerson}}</div>
        </span>  
      </div>
    
     <div>
      <div v-if="logoutModal">
        <input type=submit class="btn btn-sm" value="Sign out" @click="confirmLogout()"/>
        <input type=submit class="btn btn-sm" value="Back" @click="noLogout()"/>
      </div>
    </div>
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
        auth: false,
        user: {},
        signInText: 'Sign in',
        confirmLogout: false,
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
    EventBus.$on('hideMainHeader', data => {
      this.hideHeader = JSON.parse(data)
    });
    EventBus.$on('user', data => {        
      this.user = JSON.parse(data);
    });
    EventBus.$on('auth', data => {        
      this.auth = JSON.parse(data);
    });
    

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
   this.auth = false;
   this.user = {};
   EventBus.$emit('auth', JSON.stringify(this.auth));
   EventBus.$off('user');

 },

 logout: function() {
   this.logoutModal = true;
 },

 login: function() {
   EventBus.$emit('loginForm', JSON.stringify(true));
 }
    
 }
}
</script>

<style>

.aeris-eccad-rb-unit {
    color: navy;
}

	
</style>
