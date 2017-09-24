/*
 dependances: 
*/

<template>
  <div>
    <br />
    <div>
        <span>Dataset</span>
        <select v-model="selectedDataset">
          <option v-for="dataset in inventoriesWithSectors" v-bind:value="dataset">
            {{ dataset.inventory.titre }}
          </option>
        </select>
    </div>
    <br />
    <div class="sectorFlex" v-show="selectedDataset.inventory.id < 1">
        <div class="sectorHeaderSM">SECTOR</div>
        <div class="sectorHeaderL">DATASET</div>
    </div>    
    <div v-for="s in sectorInventories" v-show="selectedDataset.inventory.id < 1">    
        <div class="sectorFlex">
            <div class="sectorItemSM">{{s.sectorDto.name}}</div>
            <div class="sectorItemL">
                <div class="sectorColumn" v-for="i in s.inventories">{{i.titre}}</div>    
            </div>
        </div>
    </div>

    <div class="sectorFlex" v-show="selectedDataset.inventory.id > 0">
        <div class="sectorHeaderSM">SECTOR</div>
        <div class="sectorHeaderL">CODE</div>
        <div class="sectorHeaderL">COMMENT</div>
    </div>    
    <div v-for="s in selectedDataset.sectors" data-ng-show="sectorDataset.inventory.id > 0">    
        <div class="sectorFlex">
            <div class="sectorItemSM">{{s.sector.name}}</div>
            <div class="sectorItemL">{{s.sector.codeSector}}</div>
            <div class="sectorItemL">{{s.sector.commentSector}}</div>
        </div>
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
  },
  
  data () {
    return {
      sectorService: this.service,
      inventoriesWithSectors: [{'inventory': {'id': -1, 'titre': 'Select'}, 'sectors': []}],    
      sectorInventories: [],
      selectedDataset: {},
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
    console.log("Aeris Eccad Catalog Sectors - Creating");
    this.refresh();
  },
  
  computed: {
  },
  
  methods: {
    
    refresh: function() {
      // set all sectorInventories        
      var tempInvs = this.inventoriesWithSectors;
      this.$http.get(this.sectorService).then(function (result) {
        this.sectorInventories = result.data;
        result.data.forEach( function(sector) {
              
          sector.inventories.forEach( function(inventory) {
            // console.log(JSON.stringify(inventory));
            var inventoryExists = false;
            for(var i = 0; i < tempInvs.length; i++) {
                    
              if(inventory.titre === tempInvs[i].inventory.titre) {

                var sectorExists = false;
                for(var j=0; j < tempInvs[i].sectors.length; j++) {
                  if(tempInvs[i].sectors[j].sector.id === sector.sectorDto.id) {
                      sectorExists = true;
                      break;
                  }
                }
                if(!sectorExists) {
                  tempInvs[i].sectors.push({'sector': sector.sectorDto});
                }
                inventoryExists = true;
                break;
              }
            }
            if(!inventoryExists) {
              tempInvs.push({'inventory': inventory, 'sectors': [{'sector' : sector.sectorDto}]});
            }
          });
        });
    });  
    this.inventoriesWithSectors = tempInvs;
    this.selectedDataset = tempInvs[0];
  }  
}
  
}
</script>

<style>
</style>