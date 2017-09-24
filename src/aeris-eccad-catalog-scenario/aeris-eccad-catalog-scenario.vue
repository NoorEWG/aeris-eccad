/*
 dependances: 
*/

<template>
  <div>
    <br />
    <div>
        <span>Dataset</span>
        <select v-model="selectedDataset">
          <option v-for="dataset in inventoriesWithScenarios" v-bind:value="dataset">
            {{ dataset.inventory.titre }}
          </option>
        </select>
    </div>
    <br />
   <div class="sectorFlex" v-show="selectedDataset.inventory.id < 1">
        <div class="sectorHeaderSM">SCENARIO</div>
        <div class="sectorHeaderL">DATASET</div>
    </div>    
    <div v-for="s in scenarioInventories" v-show="selectedDataset.inventory.id < 1">    
        <div class="sectorFlex">
            <div class="sectorItemSM">{{s.scenarioDto.name}}</div>
            <div class="sectorItemL">
                <div class="sectorColumn" v-for="i in s.inventories">{{i.titre}}</div>    
            </div>
        </div>
    </div>

     <div class="sectorFlex" v-show="selectedDataset.inventory.id > 0">
        <div class="sectorHeaderSM">SCENARIO</div>
        <div class="sectorHeaderL">COMMENT</div>
    </div>    
    <div v-for="s in selectedDataset.scenarios" v-show="selectedDataset.inventory.id > 0">    
        <div class="sectorFlex">
            <div class="sectorItemSM">{{s.scenario.name}}</div>
            <div class="sectorItemL">{{s.scenario.textComment}}</div>
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
      scenarioService: this.service,
      inventoriesWithScenarios: [{'inventory': {'id': -1, 'titre': 'Select'}, 'sectors': []}],    
      scenarioInventories: [],
      selectedDataset: {}
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
    console.log("Aeris Eccad Catalog Scenarios - Creating");
    this.refresh();
  },
  
  computed: {
  },
  
  methods: {
    
    refresh: function() {
      // set all sectorInventories        
      var tempInvs = this.inventoriesWithScenarios;
      this.$http.get(this.scenarioService).then(function (result) {
        this.scenarioInventories = result.data;
        result.data.forEach( function(scenario) {
              
          scenario.inventories.forEach( function(inventory) {
            // console.log(JSON.stringify(inventory));
            var inventoryExists = false;
            for(var i = 0; i < tempInvs.length; i++) {
                    
              if(inventory.titre === tempInvs[i].inventory.titre) {

                var scenarioExists = false;
                for(var j=0; j < tempInvs[i].scenarios.length; j++) {
                  if(tempInvs[i].scenarios[j].scenario.id === scenario.scenarioDto.id) {
                      scenarioExists = true;
                      break;
                  }
                }
                if(!scenarioExists) {
                  tempInvs[i].scenarios.push({'scenario': scenario.scenarioDto});
                }
                inventoryExists = true;
                break;
              }
            }
            if(!inventoryExists) {
              tempInvs.push({'inventory': inventory, 'scenarios': [{'scenario' : scenario.scenarioDto}]});
            }
          });
        });
    });  
    this.inventoriesWithScenarios = tempInvs;
    this.selectedDataset = tempInvs[0];
    this.sectorDataset = tempInvs[0];
  }  
}
  
}
</script>

<style>
</style>