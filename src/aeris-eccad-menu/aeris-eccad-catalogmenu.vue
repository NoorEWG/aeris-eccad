/*
 dependances: 
*/

<template>
  <div>
    <nav class="">
        <ul class="nav nav-tabs">
            <li v-bind:key="link.menu" v-for="link in links" @click="change(link)" role="presentation"><a href="#">{{ link.text }}</a></li>   
        </ul>           
    </nav>  
</div>
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
    console.log("Aeris Eccad Catalog Menu - Creating");
    this.links = [
      {url: '', text: 'Inventories', menu: 'catalog' },
      {url: '', text: 'Species', menu: 'catalog'},
      {url: '', text: 'Sectors', menu: 'catalog'},
      {url: '', text: 'Scenarios', menu: 'catalog'},
      {url: '', text: 'Temporal', menu: 'catalog'},
      {url: '', text: 'Emission Time Series', menu: 'catalog'},
      {url: '', text: 'Inventory Time Series', menu: 'catalog'},
      {url: '', text: 'Metadata', menu: 'catalog'},
      {url: '', text: 'Data search', menu: 'catalog'}
    ]
  },
  
  computed: {
  },
  
  methods: {
    
    change: function(link) {
      // console.log("catalogmenu: " + JSON.stringify(link));
      EventBus.$emit('catalogmenu', JSON.stringify(link));
    }
  }
}
</script>

<style>
</style>