/*
 dependances: 
*/

<template>
  <nav class="navbarEccad" data-ng-controller="menuCtrl">
        <div class="menuEccad">
            <div>
                <ul class="menuEccadUl">
                    <li class="menuItemEccad" v-bind="selectedLink"  v-for="link in links">
                         <div class="menu" v-on:click="change">{{ link.text }}</div>
                    </li>
                </ul>           
            </div>
             
            <!--div data-ng-show="currentUrl.includes('catalog')">
                <span data-ng-repeat="catgroup in categoryGroups">
                    <label class="spacedradiobutton categoryGroupButtons" data-ng-style="{color: catgroup.color};">
                        <input type="radio" name="categoryGroup" value="{{catgroup.id}}" data-ng-model="categoryGroup" data-ng-click="changeCategoryGroup(categoryGroup)" />{{catgroup.name}}
                    </label>
                </span>
    
            </div-->
            <div class="hideShow">
                <a data-ng-if="!hideheader"><img src="images/hide.png" alt="hide" data-ng-click="hideHeader(true)" /></a>
                <a data-ng-if="hideheader"><img src="images/show.png" alt="show" data-ng-click="hideHeader(false)" /></a>
            </div>
        </div>
    </div>    
  </nav>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
      links: [],  
      selectedLink: {}    
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
    console.log("Aeris Eccad Main Menu - Creating");
    this.links = [
      {url: '', text: 'Home'},
      {url: '', text: 'Catalogue'},
      {url: '', text: 'Online-Tools'},
      {url: '', text: 'Help'}
    ]
  },
  
  computed: {
  },
  
  methods: {
    
    change: function() {
        EventBus.$emit('mainmenu', this.selectedLink)
    }
  }
}
</script>

<style>
</style>