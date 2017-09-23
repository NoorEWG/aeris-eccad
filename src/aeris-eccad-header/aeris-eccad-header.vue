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
    
     <!--div>
      <div v-if="logoutModal">
        <input type=submit class="btn btn-sm" value="Sign out" @click="confirm()"/>
        <input type=submit class="btn btn-sm" value="Back" @click="noLogout()"/>
      </div>
    </div-->
  </div>  	
</template>

<script>
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
    document.removeEventListener('hideMainHeader', this.setHideHeader);
    document.removeEventListener('user', this.setUser);
    document.removeEventListener('auth', this.setAuth);
  },
  
  created: function () {
    console.log("Aeris Eccad Header - Creating");
    
    document.addEventListener('hideMainHeader', this.setHideHeader);
    document.addEventListener('user', this.setUser);
    document.addEventListener('auth', this.setAuth);
 
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
  
    setHideHeader: function(evt) {
      this.hideHeader = evt.detail;
    },

    setUser: function(evt) {
      this.user = evt.detail;
    },

    setAuth: function(evt) {
      this.auth = evt.detail;
    },


  getCategoryGroups: function() {
    this.$http.get(this.eccadConfig.api + "dataset/categorygroups")
    .then(function (result) {
      var ev1 = new CustomEvent('catGroups', { 'detail': result.data });
      document.dispatchEvent(ev1); 
    });   
  },
  getSectors: function() {
    this.$http.get(this.eccadConfig.api + "data/sectors")
    .then(function (result) {
      var ev2 = new CustomEvent('allSectors', { 'detail': result.data });
      document.dispatchEvent(ev2); 
    });   
  },

  getScenarios: function() {
    this.$http.get(this.eccadConfig.api + "data/scenarios")
    .then(function (result) {
      var ev3 = new CustomEvent('allScenarios', { 'detail': result.data });
      document.dispatchEvent(ev3); 
    });   
  },

  getSpecies: function() {
    this.$http.get(this.eccadConfig.api + "data/species")
    .then(function (result) {
      var ev4 = new CustomEvent('allSpecies', { 'detail': result.data });
      document.dispatchEvent(ev4); 
    });   
  },

  getInventories: function() {
    this.$http.get(this.eccadConfig.api + "data/inventories")
    .then(function (result) {
      var ev5 = new CustomEvent('allInventories', { 'detail': result.data });
      document.dispatchEvent(ev5); 
    });   
  },

  getSpeciesGroups: function() {
    this.$http.get(this.eccadConfig.api + "data/groupofspecies")
    .then(function (result) {
      var ev6 = new CustomEvent('allSpeciesGroups', { 'detail': result.data });
      document.dispatchEvent(ev6); 
    });   
  },

  getResolutions: function() {
    this.$http.get(this.eccadConfig.api + "data/resolutions")
    .then(function (result) {
      var ev7 = new CustomEvent('allResolutions', { 'detail': result.data });
      document.dispatchEvent(ev7); 
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
 confirm: function() {
   this.auth = false;
   this.user = {};
   var ev8 = new CustomEvent('auth', { 'detail': this.auth });
   document.dispatchEvent(ev8); 
   // EventBus.$off('user');

 },

 logout: function() {
   this.logoutModal = true;
 },

 login: function() {
    var ev9 = new CustomEvent('loginForm', { 'detail': true });
    document.dispatchEvent(ev9); 
 }
    
 }
}
</script>

<style>

.aeris-eccad-rb-unit {
    color: navy;
}

	
</style>
