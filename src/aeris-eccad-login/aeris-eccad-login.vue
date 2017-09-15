/*
 dependances: 
*/


<template>
  <div>
	  <div class="marginTopLogin"></div>            
      <div class="centerLoginForm">
        <div class="loginFormButtons">
            <div class="title1">Authentication</div>
            <div class="">Log in with your login/password</div>
        </div>              
        <div>
            <span class="label label-warning">temp:</span>
            <code>{{email}} {{pwd}}</code>
        </div>
        <form name="validationForm" onsubmit="return false;">
            <div class="form-group">
              <label class="loginLabel">Email <span class="mandatory">*</span></label></label>
              <input v-model="email" name="email" type="text" v-validate.initial="email" data-rules="required" placeholder="Email">
              <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
            </div>
            <div class="form-group">
              <label class="loginLabel">Password <span class="mandatory">*</span></label>
              <input v-model="pwd" name="pwd" type="password" v-validate.initial="pwd" data-rules="required" placeholder="Password">
              <p class="text-danger" v-if="errors.has('pwd')">{{ errors.first('pwd') }}</p>
            </div>
            <div class="loginFlex">
                <input type="submit" class="validation" value="Connect" v-model="connectButton" @click="send" />
                <button type="button" class="validation" @click="register">Register</button>
                <button type="button" class="validation" @click="register">Update</button>
                
            </div>
        </form>         
        <div class="alert alert-success" aria-hidden="true" v-show="loginSuccess">
            <div class="gwt-Label">Login success. You're going to be redirected ...</div>
        </div>
        <div class="alert alert-warning" aria-hidden="true" v-show="!isConfirmed">
            <div class="gwt-Label">You haven't confirmed your account yet. Please check your emails.</div>
        </div>
        <div v-show="loginFail" class="alert alert-danger">
            <div class="gwt-Label">Login failure. Check your parameters.</div>
        </div>
            
        <div class="loginFlex">
            <a class="GCTD--HDBN clickableImage GCTD--HDNM">Forgot your password ?</a>
            <div class="mandatory">*</div>
            <div class="field GCTD--HDNM">Mandatory Field</div>
        </div>
      </div>
    </div>        
	</div>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    service: {
      type: String,
      default: ''
    },
  },
  
  data () {
    return {
      loginService: this.service,
      user: {},
      email: '',
      pwd: '',
      loginSuccess: false,
      isConfirmed: true,
      loginFail: false,
      connectButton: 'Connect'
    }
  },
  
  watch: {
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  	EventBus.$off('login', {})
  },
  
  created: function () {
    console.log("Aeris Eccad Login - Creating");
  },
  
  computed: {
  },
  
  methods: {
  
  loginUser: function() {   
    var url = "http://eccad.aeris-data.fr/eccad2web/rest/user/login?email=" + this.email + "&pwd=" + this.pwd;
    this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
  },
      
  handleSuccess : function(response) {
     this.user = response.data;
     this.loginFail = false;
     if(this.user.confirmed === false) {
       this.isConfirmed = false;
     } 
     else {
       this.isConfirmed = true;
       this.loginSuccess = true;
       EventBus.$emit('auth', JSON.stringify(true));
       EventBus.$emit('toolsmenu', JSON.stringify({url: '', text: 'Map Display', menu: 'tools'}));
       EventBus.$emit('user', JSON.stringify(this.user));

     }     
  },
  
  handleError: function(response) {
  	//console.log("Aeris-Eccad-Login - Error while accessing server:"); 
    // var error = response.status;
    //var message = response.statusText;
    //if(!error) message = 'Can\'t connect to the server';
    //console.log('Error ' + error + ': ' + message);
    this.user = {};
    this.loginFail = true;
  },

  register: function() {
    // TODO
  },

  send: function() {
    if(this.pwd.length > 7 && this.email.length > 10 ) {
      this.loginUser();
    }
  }

     
  }
}
</script>

<style>	
</style>