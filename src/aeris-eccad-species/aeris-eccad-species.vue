/*
 dependances: 
*/


<template>
	<div>
    <div class="loadingSpecies" v-show="!showSpecies">
      <div><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></div>
      <div>Please wait while the species are loading <br>......This may take several minutes</div>
    </div>
  
    <div class="sectorFlex" v-show="showSpecies">
      <div v-for="(c, index) in categories">
        <span v-if="c.fullName !== 'Select'" :class="[c.isChecked ? c.colorCircle : 'white-circle checkboxSpecies']"> 
          <input type="checkbox" v-model="selectedCategory" checked="true" @click="addRemoveCategoryGroup(selectedCategory, index, c.id)" >   
        </span>
        <label v-if="c.fullName !== 'Select'" class="labelSpecies">{{c.fullName}}</label>
      </div>   
    </div>

    <div :id="pG.id" v-for="pG in paramGroups">               
      <div class="headerSpecies">
        <a :id="pG.hide" class="showImgSpecies"><img src="images/hide.png" alt="hide"  @click="hideParamGroup(pG.id)" /></a>
        <a :id="pG.show" class="hideImgSpecies"><img src="images/show.png" alt="show" @click="hideParamGroup(pG.id)" /></a>
        <span><b>{{pG.name}}</b></span>
      </div>  
      <table :id="pG.table" class="speciesTable showTable">
        <tbody>
          <tr class="topRowSpecies speciesTableRowContent speciesSmallTitles">
            <td class="firstColumnSpecies">Species</td>
            <td class="otherColumnSpecies" v-for="s in pG.species">{{s.displayName}}</td>
          </tr>
          <tr class="topRowSpecies speciesTableRowContent speciesSmallTitles">
            <td class="firstColumnSpecies">Moleculair Mass</td>
            <td class="otherColumnSpecies" v-for="m in pG.species">{{m.molecularMass}}</td>
          </tr>
          <tr v-for="inventory in pG.inventories" :class="[inventory.total > 0  && inventory.showInventory == true ? 'speciesTableRowContent speciesSmallTitles' : 'hideSpecies']">
            <td class="firstColumnSpecies">{{inventory.name}}</td>
            <td class="otherColumnSpecies" v-for="species in inventory.species">
              <div :id="species.id" class="speciesRow">          
                <div v-for="c in species.categories" :class="c.color"></div>           
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      showSpecies: false, 
      selectedCategory: true,
      selectedCatGroups: [],
      paramGroups: [],
      selected: [],
      hideShow: false,
      invCats: [],
      categories: [],
      eccadConfig: {
        api: 'http://eccad.aeris-data.fr/eccad2web/rest/' 
      }  
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
    console.log("Aeris Eccad Species - Creating");
    EventBus.$on('categories', data => {
      var categories = JSON.parse(data);
      categories.forEach( function(cat) {
        cat.colorCircle = cat.color + "-circle checkboxSpecies"
        cat.isChecked = true;
      });
      var selCatGr = [];
      categories.forEach( function (c) {
         selCatGr.push(c);
      }); 
      this.categories = categories;
      this.selectedCatGroups = selCatGr;

      if (this.categories.length > 0) {
        this.getParamGroups();
      }  
    }); 
    EventBus.$on('invCats', data => {
      this.invCats = JSON.parse(data);
      this.getParamGroups();
    });  
  },
  
  computed: {
  },
  
  methods: {
  
  getParamGroups: function() {

    if(this.invCats.length > 0 && this.categories.length > 0) {

      var cats = this.categories;
      // get the parametergroups (for now only emissions)
      this.$http.get(this.eccadConfig.api + "dataset/species/" + 3).then(function (result) {       
        var cles = [];
        var tmpInvCats = this.invCats;
        // console.log("species, invCats: " + JSON.stringify(tmpInvCats));
        var paramGroups = [];
        
        for(var k in result.data) {
          cles.push(k);
        }    
        
        // set the parameter groups
        for(var i = 0; i < cles.length; i++) {    
            
          // in the list is a empty array, so leave that one out
          if(result.data[cles[i]][0] && result.data[cles[i]][0].hasOwnProperty("parameterGroupName")) {
                  
            var species = [];
            result.data[cles[i]].forEach(function(s) {
              species.push({id : s.id, name : s.displayName, categories : []});
            });
           
            paramGroups.push({
              id : cles[i],
              hide: 'hide' + cles[i],
              show: 'show' + cles[i],
              table: 'table' + cles[i],
              sp : species,
              species : result.data[cles[i]],
              name : result.data[cles[i]][0].parameterGroupName,
              inventories : []
            });
          }
        }

        // add the inventories to the parameter groups
        this.invCats.forEach( function(inventory) {

          var inventoryName = inventory.name;
          for(var i=0 ; i < paramGroups.length ; i++) {
            var inventorySpecies = [];
            for(var j = 0 ; j < paramGroups[i].sp.length; j++) {
              inventorySpecies.push({id : paramGroups[i].sp[j].id, categories : []});
            }

            paramGroups[i].inventories.push({name : inventoryName, species :  inventorySpecies , categoryIndex: [], total: 0, showInventory : true});    
          };
        });
  
        // add the categorycolors to each parameter
        this.invCats.forEach( function(inventory) {

          inventory.catparam.forEach( function(catParam) { 

            var catColor = catParam.color + "-circle";
            catParam.parameters.forEach(function (p) {
              var speciesFound = false;
              //add the category to the species of the corresponding inventory
              for(var k = 0; k < paramGroups.length ; k++) {     

                if(!speciesFound) {

                  for(var count = 0; count < paramGroups[k].inventories.length ; count++) {     

                    if(paramGroups[k].inventories[count].name == inventory.name) {
                        
                      for(var m = 0; m < paramGroups[k].inventories[count].species.length ; m++) {

                        if(p.id == paramGroups[k].inventories[count].species[m].id) {  

                          for(var n = 0; n < paramGroups[k].inventories[count].species[m].categories.length ; n++) {

                              var isInCategories = false;
                              if(catColor == paramGroups[k].inventories[count].species[m].categories[n].color) {
                                  isInCategories = true;
                                  break;
                              }
                          }
                          if(!isInCategories) {
                            // add 1 to total (for display purposes, only display if total > 0)
                            paramGroups[k].inventories[count].total = paramGroups[k].inventories[count].total + 1;
                            // add the categories by inventory (for display purposes, do not display when category unchecked and no categories left)
                      
                            for(var i = 0; i < cats.length; i++) {
                              if(catParam.color == cats[i].color) {
                                if(!(i in paramGroups[k].inventories[count].categoryIndex)) {
                                  paramGroups[k].inventories[count].categoryIndex.push(i);
                                } 
                              }
                            };
                                                                                  
                            // add the color
                            var cColor = catColor + " colorCircle";
                            paramGroups[k].inventories[count].species[m].categories.push({color : cColor});
                          }
                         
                          speciesFound = true;
                          break;
                        }
                      }      
                    }
                  }
                }
              }
            });
          });
        }); 
        this.paramGroups = paramGroups;
        this.showSpecies = true; 
      });     
    }
  },
    
  hideParamGroup: function(id) {
            
         if(document.getElementById("hide"+ id).className == "showImgSpecies" ) {
            this.hideShow = true;
            document.getElementById("table" + id).className = "speciesTable hideTable"; 
            document.getElementById("show" + id).className = "showImgSpecies"; 
            document.getElementById("hide" + id).className = "hideImgSpecies";
        }
        else { 
            this.hideShow = false;
            document.getElementById("table" + id).className = "speciesTable showTable";
            document.getElementById("hide" + id).className = "showImgSpecies"; 
            document.getElementById("show" + id).className = "hideImgSpecies"; 
        }
    },

  addRemoveCategoryGroup: function(isChecked, index, id) {
  
      if(isChecked) {
        this.categories[index].isChecked = true;
        this.selectedCatGroups.push(this.categories[index]);

        var color = this.categories[index].color + "-circle";
        var items = document.getElementsByClassName(color + " colorCircle hideCircle");

        for(var j = 0 ; j < items.length; j++) {
              items[j].className =  color + " colorCircle";
        }
      } 
      else {
        this.categories[index].isChecked = false;
        for(var i = 0; i < this.selectedCatGroups.length ; i++) {
            if(id == this.selectedCatGroups[i].id) {
                var items = document.getElementsByClassName(this.selectedCatGroups[i].color + "-circle colorCircle");
                // console.log("colors: " + items.length);
                var catColor = this.selectedCatGroups[i].color;
                this.selectedCatGroups.splice(i,1);

                for(var j = 0 ; j < items.length; j++) {
                    items[j].className =  catColor + "-circle colorCircle hideCircle";
                }
                
            }
        }
      }

      for(var k = 0; k < this.paramGroups.length ; k++) {     

        for(var l = 0; l < this.paramGroups[k].inventories.length ; l++) {    
        
          var number = this.paramGroups[k].inventories[l].categoryIndex.length;
        
          if(number > 0) {
            var selected = [];
            this.selectedCatGroups.forEach( function(s) {
                selected.push(s.id);
            });

            for(var m = 0; m < this.paramGroups[k].inventories[l].categoryIndex.length ; m++) {
              var found = false;
              for(var n = 0; n < selected.length; n++) {
                if(selected[n] == this.categories[this.paramGroups[k].inventories[l].categoryIndex[m]].id) {
                    found = true;
                    break;
                }
              }
              if(!found){
                  number--; 
              }
            };
            if (number > 0) {
              this.paramGroups[k].inventories[l].showInventory = true;
            }     
            else {
              this.paramGroups[k].inventories[l].showInventory = false;
            }   
          } 
          else {
            this.paramGroups[k].inventories[l].showInventory = false;    
          }
        }
      }
    }
  }
}
</script>

<style>	
</style>