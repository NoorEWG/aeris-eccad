/*
 dependances: 
*/

<template>
  <nav class="navbarEccad" data-ng-controller="menuCtrl">
        <div class="menuEccad">
            <div>
                <ul class="menuEccadUl">
                    <li class="menuItemEccad" v-bind:key="link.menu" v-for="link in links">
                         <div class="menu" @click="change(link.menu)">{{ link.text }}</div>
                    </li>
                </ul>           
            </div>
             
            <div v-if="showCategories">
                <span v-bind:key="catgroup.id" v-for="catgroup in categoryGroups">
                    <label class="spacedradiobutton categoryGroupButtons" :class="{color: catgroup.color}">
                        <input type="radio" name="categoryGroup" :value="catgroup.id" v-model="categoryGroup" data-ng-click="changeCategoryGroup(categoryGroup)" />{{catgroup.name}}
                    </label>
                </span>
            </div>
            <div class="hideShow">
                <a v-if="!hideheader"><img src="images/hide.png" alt="hide" @click="hideHeader(true)" /></a>
                <a v-if="hideheader"><img src="images/show.png" alt="show" @click="hideHeader(false)" /></a>
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
      categoryGroups: [],  
      showCategories : false,
      selectedLink: {}    
    }
  },
  
  watch: {
    selectedLink (value) {
        if(value.menu === 'catalog') {
            this.showCategories = true;
        }
        else {
            this.showCategories = false;
        }
    }, 
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
      {url: '', text: 'Home', menu: 'home'},
      {url: '', text: 'Catalogue', menu: 'catalog'},
      {url: '', text: 'Online-Tools', menu: 'tools'},
      {url: '', text: 'Help', menu: 'help'}
    ];
    //EventBus.$on('mainmenu', data => {
    //    this.selectedLink = JSON.parse(data)
	//});
    EventBus.$on('catalogmenu', data => {
        this.selectedLink = JSON.parse(data)
	});
    EventBus.$on('toolsmenu', data => {
        this.selectedLink = JSON.parse(data)
	});
    EventBus.$on('catGroups', data => {
        this.categoryGroups = JSON.parse(data)
	});

  },
  
  computed: {
  },
  
  methods: {
    
    change: function(menu) {
        EventBus.$emit('mainmenu', JSON.stringify(menu))
    }
  }
}
</script>

<style>
</style>