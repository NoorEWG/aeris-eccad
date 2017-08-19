/*
 dependances: 
*/
in

<template>
   <span>
	  <div class="inventoriesHeader">
        <div class="inventoryItemSm"> 
            <span>Title &nbsp;</span>
            <span class="fa fa-caret-down" v-on="orderByTitleAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" v-on="orderByTitleDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span>Categories &nbsp;</span> 
            <span class="fa fa-caret-down" v-on="orderByCategoriesAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" v-on="orderByCategoriesDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span>Temporal coverage &nbsp;</span> 
            <span class="fa fa-caret-down" v-on="orderByTemporalCoverageAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" v-on="orderByTemporalCoverageDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span> Time resolution &nbsp;</span> 
            <span class="fa fa-caret-down" v-on="orderByTimeResolutionAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" v-on="orderByTimeResolutionDesc()">&nbsp;</span>
        </div>
        <div class="inventoryItemSm">
            <span> Grid size &nbsp;</span> 
            <span class="fa fa-caret-down" v-on="orderByGridSizeAsc()">&nbsp;</span>
            <span class="fa fa-caret-up" v-on="orderByGridSizeDesc()">&nbsp;</span>
            </div>
        <div class="inventoryItemM">
            <span>Provider(s) &nbsp;</span>
            <span class="fa fa-caret-down">&nbsp;</span>
            <span class="fa fa-caret-up">&nbsp;</span>
        </div>
    </div>
    
    <div>
        <div class="inventoriesColumn">
            <!--div class="inventories" data-ng-repeat="i in invCats | filter: { catgroupId : categoryGroupId } | orderBy : inventoryOrder"-->
            <div class="inventories" v-for="i in invCats">
                <div class="inventoryItemSm">
                    <div><a href="metadata({name: i.name, inventory : i.id})">{{i.name}}</a></div>
                    <div>{{i.geospatial}} - {{i.publication}}</div>
                </div>
                <div  class="inventoryItemSm">
                    <div v-for="c in i.catparam">
                        <a href="#" v-on:click="openModal(c.parameters)" :style="{'color' : c.color}" data-toggle="tooltip" :title="c.parameters.length">{{c.name}}</a>
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
        invCats: {type: Array},
        inventoryParameters: {type: Array},
        inventoryOrder: "order"
    }
  },
  
  watch: {
    service (value) {
	      this.catalogService = value
	      this.refresh();
    }, 
  },
  
  mounted: function () {
   this.refresh(); 
  },
  
   updated: function() {
  },
  
  destroyed: function() {
  },
  
  created: function () {
  	console.log("Aeris Eccad Catalog - Creating");
  	this.invCats = [];
  },
 
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  	   if (this.catalogService) {
  	   var url = this.catalogService ;
  	   console.log(url);
   	   this.$http.get(this.catalogService).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
   	   }
   },
      
  handleSuccess : function(response) {
  
    var tmpInvCats = response.data;
    this.invCats = [];
    // console.log(JSON.stringify(response.data));
    var categoryGroupName = response.data.nameCategoryGroup;
    // TODO:  var categoryGroupId = response.data.idCategoryGroup;
	var tmp = [];
	
	tmpInvCats.forEach(function(item) {

		var aux = item;
		var cp = item.categoriesAndParametres;
		var inventory = {};
		
		tmp.push(inventory);
		
		
		
		inventory.inventoryGroupId = item.idInventoryGroup;
		inventory.catgroupName = categoryGroupName;
		// inventory.catgroupId = categoryGroupid;
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
				// });
			//});
		});
		
	});
	this.invCats = tmp;
    EventBus.$emit('invCats', tmp);
  },
  
  handleError: function(response) {
  		console.log("Aeris-Eccad-Catalog - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
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
        // TODO
    },

    orderByProviderDesc: function () {
       // TODO
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

.aeris-eccad-category-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-category-list {
    width: 140px;
    display: inline-block;
}
	
</style>