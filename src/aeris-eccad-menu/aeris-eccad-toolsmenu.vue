/*
 dependances: 
*/

<template>
  <nav class="navbarEccad" data-ng-controller="menuCtrl">
        <div class="menuEccad">
            <div>
                <ul class="menuEccadUl">
                    <li class="menuItemEccad" v-bind:key="link.menu"  v-for="link in links">
                         <div class="menu" @click="change(link)">{{ link.text }}</div>
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
      links: []    
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
    console.log("Aeris Eccad Tools Menu - Creating");
    this.links = [
      {url: '', text: 'Map', menu: 'tools'},
      {url: '', text: 'Mapcompare', menu: 'tools' },
      {url: '', text: 'Timeseries Analysis', menu: 'tools' },
      {url: '', text: 'Scatterplot', menu: 'tools'},
      {url: '', text: 'Help', menu: 'tools'}
    ]
  },
  
  computed: {
  },
  
  methods: {
    
    change: function(link) {
        EventBus.$emit('toolsmenu', JSON.stringify(link));
    }
  }
}
</script>

<style>
</style>