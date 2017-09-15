/*
 dependances: 
*/
in

<template>
   <span>
	  <div class="inventoriesHeader">
        <div class="inventoryItemSm"> 
            <span>Title &nbsp;</span>
            <span class="fa fa-caret-down" @click="orderByTitleAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByTitleDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span>Categories &nbsp;</span> 
            <span class="fa fa-caret-down" @click="orderByCategoriesAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByCategoriesDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span>Temporal coverage &nbsp;</span> 
            <span class="fa fa-caret-down" @click="orderByTemporalCoverageAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByTemporalCoverageDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span> Time resolution &nbsp;</span> 
            <span class="fa fa-caret-down" @click="orderByTimeResolutionAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByTimeResolutionDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span> Grid size &nbsp;</span> 
            <span class="fa fa-caret-down" @click="orderByGridSizeAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByGridSizeDesc()">&nbsp;</span>
            </div>
        <div class="inventoryItemM">
            <span>Provider(s) &nbsp;</span>
            <span class="fa fa-caret-down" @click="orderByProviderAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" @click="orderByProviderDesc()">&nbsp;</span>
        </div>
    </div>
    
    <div>
        <div class="inventoriesColumn">
            <!--div class="inventories" data-ng-repeat="i in invCats | filter: { catgroupId : categoryGroupId } | orderBy : inventoryOrder"-->
            <div class="inventories" v-for="i in filteredAndOrderedCatalog">
                <div class="inventoryItemSm">
                    <div><a @click="metadata(i)">{{i.name}}</a></div>
                    <div>{{i.geospatial}} - {{i.publication}}</div>
                </div>
                <div  class="inventoryItemSm">
                    <div v-for="c in i.catparam">
                        <a href="#" @click="openModal(c.parameters)" :style="{'color' : c.color}" data-toggle="tooltip" :title="c.parameters.length">{{c.name}}</a>
                    </div>    
                </div>
                <div  class="inventoryItemSm">
                    <div v-for="t in i.temporalCoverage">{{t}}</div>
                </div>
                <div  class="inventoryItemSm">
                    <div v-for="interval in i.interval"><span>{{interval}}</span></div>
                </div>
                <div  class="inventoryItemSm">
                    <div v-for="grid in i.resolutions">{{grid}}</div>
                </div>
                <div  class="inventoryItemM">
                    <a href="i.projectUrls[0]"><img :src="i.logo"/></a>
                </div>
            </div>
        </div>
    </div>

    <div ref="customModal" class="modalDialog" v-on:click="closeModal()">
        <div>
            <a href="#" class="closeModal" >X</a>
            <div v-for="p in inventoryParameters" >{{p.fullname}}</div>
        </div>
    </div>
  </span> 
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
        catalogService: this.service,
        invCats: [],
        selectedInvCats: [],
        categoryGroups: {type: Array},
        selectedCatGroupId: -1,
        inventoryParameters: {type: Array},
        inventoryOrder: "order"
    }
  },
  
  computed: { 
    
    filteredAndOrderedCatalog: function() {
        // Apply filter first
        let result = this.invCats;
        if (this.selectedCatGroup) {
            result = result.filter(item => item.id === this.selectedCatGroup.id);
        }
        return _.orderBy(result, this.inventoryOrder);
    },
  },
  
  watch: {
    selectedCatGroup (value) {
        // Apply filter first
        let result = this.invCats;
        console.log("selectedCatGroup:" + value)
        if (value) {
            result = result.filter(item => item.id === value.id);
        }
        this.selectedInvCats = _.orderBy(result, this.inventoryOrder);
    }
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
  },
  
  created: function () {
  	console.log("Aeris Eccad Catalog - Creating");
  	EventBus.$on('catGroups', data => {
      this.categoryGroups = JSON.parse(data);
	  var tmp = this.categoryGroups;
      for(var i = 0; i < tmp.length ; i++) {
         this.refresh(tmp[i].name); 
      }   
    });
    EventBus.$on('categorygroup', data => {
      this.selectedCatGroup = JSON.parse(data); 
    });
  },
 
  methods: {
  
  refresh: function(catgroupname) {
    this.$http.get(this.catalogService + catgroupname).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   },
      
  handleSuccess : function(response) {
  
    var tmpInvCats = response.data;
    var categoryGroupName = response.data.nameCategoryGroup;
    var categoryGroupId = 1;
    if(categoryGroupName !== 'emissions') {
      categoryGroupId = 2;
    }
   	var tmp = [];
	
	tmpInvCats.forEach(function(item) {

		var aux = item;
		var cp = item.categoriesAndParametres;
		var inventory = {};
		
		tmp.push(inventory);
				
		inventory.inventoryGroupId = item.idInventoryGroup;
		inventory.catgroupName = categoryGroupName;
		inventory.catgroupId = categoryGroupId;
		inventory.publication = item.publication;
		inventory.name = item.nameInventoryGroup;
		inventory.temporalCoverage = [];
		inventory.interval = [];
		inventory.catparam = [];
		inventory.resolutions = item.resolutions;
		inventory.logo = "http://eccad.aeris-data.fr/Doc/Logo/logo_"
				+ inventory.name
				+ ".png";
		if (item.global == true) {
			inventory.geospatial = "Global";
		} else {
			inventory.geospatial = item.geospatialRegions[0];
		}
	
		var inttemp = [];
		var intcov = [];
	
		cp.forEach(function(catparam) {
	
			inventory.catparam.push({
				// "name" : this.capitalizeFirstLetter(catparam.name),
				"name" : catparam.name,
				"parameters" : catparam.parametresDTO,
				"color" : catparam.color
			});
			
			// only add unique intervals
			var b = 0;
			inttemp.forEach(function(c) {
				if (b == 0) {
					if (c === catparam.interval) {
						b++;
					}
				}
			});
			if (b == 0) {
				inttemp.push(catparam.interval);
			}
			inventory.interval = inttemp;
	
			// only add unique temporal coverage
			b = 0;
			intcov.forEach(function(c) {
				if (b == 0) {
					if (c === catparam.temporalCoverage) {
						b++;
					}
				}
			});
					
			if (b == 0) {
				intcov.push(catparam.temporalCoverage);
			}
			inventory.temporalCoverage = intcov;
		});
		
	});
	if(this.invCats.length <= 0) {
      this.invCats = tmp;
    }
    else {
      var aux = this.invCats;
      tmp.forEach( function(ic) {
        aux.push(ic);
      });
      this.invCats = aux;  
      this.selectedInvCats = aux;
    }
    if(aux) {
        EventBus.$emit('invCats', JSON.stringify(aux));
    }
  },
  
  handleError: function(response) {
  		console.log("Aeris-Eccad-Catalog - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
   },

    metadata: function(inventory) {
      var metadata = {
        id: inventory.id,
        name: inventory.name
      }
      EventBus.$emit('metadata', JSON.stringify(metadata));  
      // change to the metadatatab
      EventBus.$emit('catalogmenu', JSON.stringify({url: '', text: 'Metadata', menu: 'catalog'}));
    },

    orderByTitleAsc: function () {
         this.inventoryOrder = "name";
    },

    orderByTitleDesc: function () {
         this.inventoryOrder = "-name";
    },

    orderByCategoriesAsc: function () {
         this.inventoryOrder = "catparam";
    },

    orderByCategoriesDesc: function () {
         this.inventoryOrder = "-catparam";
    },

    orderByTemporalCoverageAsc: function () {
         this.inventoryOrder = "temporalCoverage";
    },

    orderByTemporalCoverageDesc: function () {
         this.inventoryOrder = "-temporalCoverage";
    },

    orderByTimeResolutionAsc: function () {
         this.inventoryOrder = "interval";
    },

    orderByTimeResolutionDesc: function () {
         this.inventoryOrder = "-interval";
    },

    orderByGridSizeAsc: function () {
         this.inventoryOrder = "resolutions";
    },

    orderByGridSizeDesc: function () {
         this.inventoryOrder = "-resolutions";
    },

    orderByProviderAsc: function () {
        // this.inventoryOrder = "logo";
    },

    orderByProviderDesc: function () {
        // this.inventoryOrder = "-logo";
    },
        
    openModal: function (parameters) {
      this.inventoryParameters = parameters;
      this.$refs.customModal.removeAttribute("modalDialog");
      this.$refs.customModal.setAttribute("class", "modalDialogShow");
    },

    closeModal: function () {
      this.$refs.customModal.removeAttribute("modalDialogShow");
      this.$refs.customModal.setAttribute("class", "modalDialog");
    },
    
    capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
  }
}
</script>

<style>
</style>