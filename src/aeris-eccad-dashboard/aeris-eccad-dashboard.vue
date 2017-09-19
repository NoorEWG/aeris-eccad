/*
 dependances: 
*/

<template>
    <div>
    	<div class="overviewFlex">
			<div>   
				<span class="overviewTitle">Categories</span> 
				<span class="eccadBadge" v-if="selectedDatatypeIds.length < 1 && categories.length >= selectedDatatypeIds.length">{{categories.length}}</span>
				<span class="eccadBadge" v-if="selectedDatatypeIds.length >= 1">{{selectedDatatypeIds.length}}</span>
				<ul class="overviewListW">
					<li :class="datatypeClass(datatype)"
					v-for="datatype in categories" v-if="datatype.id > 0"
					v-on:click="datatypeChanged(datatype)">{{datatype.fullName}}</li>
				</ul>
				<div style="min-height: 8px"></div>
				<span class="overviewTitle">Sectors</span> 
				<span class="eccadBadge" v-if="selectedSectorIds.length < 1 && sectors.length >= selectedSectorIds.length && !noSectors">{{sectors.length}}</span>
				<span class="eccadBadge" v-if="selectedSectorIds.length >= 1 || (selectedSectorIds.length < 1 && noSectors)">{{selectedSectorIds.length}}</span>
				<ul class="overviewListMLW">
					<li :class="sectorClass(sector)"
						v-for="sector in sectors" 
						v-on:click="sectorChanged(sector)">{{sector.name}}</li>
				</ul>
			</div>
        	<div>
				<span class="overviewTitle">Species</span> 
				<span class="eccadBadge" v-if="selectedSpeciesIds.length < 1 && species.length >= selectedSpeciesIds.length && !noSpecies">{{species.length}}</span>
				<span class="eccadBadge" v-if="selectedSpeciesIds.length >= 1 || (selectedSpeciesIds.length < 1 && noSpecies)">{{selectedSpeciesIds.length}}</span>
				<ul class="overviewListML">
					<li :class="speciesClass(parameter)"
						v-for="parameter in species"
						v-on:click="speciesChanged(parameter)">{{parameter.shortName}}</li>
				</ul>
				<span class="overviewTitle">Group of Species</span> 
				<span class="eccadBadge" v-if="selectedSpeciesGroupIds.length < 1 && speciesGroups.length >= selectedSpeciesGroupIds.length">{{speciesGroups.length}}</span>
				<span class="eccadBadge" v-if="selectedSpeciesGroupIds.length >= 1">{{selectedSpeciesGroupIds.length}}</span>
				<ul class="overviewList">
					<li :class="speciesGroupClass(speciesGroup)"
						v-for="speciesGroup in speciesGroups"
						v-on:click="speciesGroupChanged(speciesGroup)">{{speciesGroup.fullname}}</li>
				</ul>
			</div>
			<div>
				<span class="overviewTitle">Datasets</span>
				<span class="eccadBadge" v-if="selectedDatasetIds.length < 1 && inventories.length >= selectedDatasetIds.length">{{inventories.length}}</span>
				<span class="eccadBadge" v-if="selectedDatasetIds.length >= 1">{{selectedDatasetIds.length}}</span>
				<ul class="overviewListL">
					<li  :class="datasetClass(dataset)"
						v-for="dataset in inventories"
						v-on:click="datasetChanged(dataset)">{{dataset.titre}}</li>
				</ul>
			</div>
			<div>
				<span class="overviewTitle">Scenarios</span> 
				<span class="eccadBadge" v-if="selectedScenarioIds.length < 1 && scenarios.length >= selectedScenarioIds.length && !noScenarios">{{scenarios.length}}</span>
				<span class="eccadBadge" v-if="selectedScenarioIds.length >= 1 || (selectedScenarioIds.length < 1 && noScenarios)">{{selectedScenarioIds.length}}</span>
				<ul class="overviewListM">
					<li :class="scenarioClass(scenario)"
						v-for="scenario in scenarios"
						v-on:click="scenarioChanged(scenario)">{{scenario.displayNameScenario}}</li>
				</ul>
				
			
				<span class="overviewTitle" hidden>Geographical</span>
				<ul class="overviewListL" hidden>
				<li :class="geoClass(1)"
					v-on:click="geoChanged(1)" hidden>Global</li>
				<li :class="geoClass(2)"
					v-on:click="geoChanged(2)" hidden>Regional</li>	
				</ul>
		
				
				<div>
					<span class="overviewTitle">Temporal</span>
					<!--rzslider rz-slider-model="slider.minValue"
						rz-slider-high="slider.maxValue"
						rz-slider-options="slider.options"></rzslider-->
					<vue-slider ref="slider" :min="slider.minValue" :max="slider.maxValue" v-model="value"></vue-slider>	
				</div>
				<span class="overviewTitle">Resolutions</span>		
				<span class="eccadBadge" v-if="selectedResolutionIds.length < 1 && resolutions.length >= selectedResolutionIds.length">{{resolutions.length}}</span>
				<span class="eccadBadge" v-if="selectedResolutionIds.length >= 1">{{selectedResolutionIds.length}}</span>
				<ul class="overviewListL">
					<li :class="resolutionClass(resolution)"
						v-for="resolution in resolutions"
						v-on:click="resolutionChanged(resolution)">{{resolution.fullNameResolution}}</li>
				</ul>
				<span class="overviewTitle">Geospatial</span> 
				<span class="eccadBadge" v-if="selectedGeospatialIds.length < 1">{{geospatials.length}}</span>
				<span class="eccadBadge" v-if="selectedGeospatialIds.length >= 1">{{selectedGeospatialIds.length}}</span>
				<ul class="overviewListM">
					<li :class="geospatialClass(geospatial)"
						v-for="geospatial in geospatials"
						v-on:click="geospatialChanged(geospatial)">{{geospatial.fullnameGeospatial}}</li>
				</ul> 
				<div>
					<aeris-eccad-bbox datasearch="true"></aeris-eccad-bbox>  
				</div>	
          		<div type="button" class="btn btn-default floatRight"  v-on:click="reset()" >reset<span class="fa fa-close"></span></div>
				
			</div>		  
    	</div>
    </div>
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
import vueSlider from 'vue-slider-component/src/vue-slider.vue'
export default {
 props: {
	value : 2017 
  },
  
  data () {
    return {
      categories : [],
	  	inventories : [],  
      sectors : [],
	  	scenarios : [],
	  	species : [],
	  	resolutions: [],
	  	speciesGroups : [],
		geospatials: [],  
      selectedDatatypeIds : [],
      selectedDatasetIds : [],
	  	selectedSectorIds : [],
	  	selectedScenarioIds : [],
	  	selectedSpeciesIds : [],
	  	selectedSpeciesGroupIds : [],
	  	selectedResolutionIds : [],
		selectedGeospatialIds: [],  
      slider : {
	    	minValue: new Date().getFullYear(),
	    	maxValue: new Date().getFullYear(),
	    	options: {
	        floor: 1750,
	        ceil: 2200,
	        step: 5,
	        noSwitching: true
	    },
      },  
	  	noScenarios : false,
	  	noSectors : false,
      noSpecies : false,
      eccadConfig : {
        api : "http://eccad.aeris-data.fr/eccad2web/rest/"    
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
    console.log("Aeris Eccad Dashboard - Creating");
    EventBus.$on('categories', data => {
	  this.categories = JSON.parse(data);
		});	
		EventBus.$on('allSectors', data => {
			this.sectors = JSON.parse(data);
		});	
			EventBus.$on('allScenarios', data => {
			this.scenarios = JSON.parse(data);
		});	
		EventBus.$on('allSpecies', data => {
			this.species = JSON.parse(data);
		});
		EventBus.$on('allInventories', data => {
			this.inventories = JSON.parse(data);
		});	
		EventBus.$on('allSpeciesGroups', data => {
			this.speciesGroups = JSON.parse(data);
		});
		EventBus.$on('allResolutions', data => {
			this.resolutions = JSON.parse(data);
		});	
		EventBus.$on('allGeospatials', data => {
			this.geospatials = JSON.parse(data);
		});	
  },
  
  computed: {
  },
  
  methods: {

	reset : function() {
		this.resetAll();
	},
	
    resetAll : function() {
	    this.selectedDatatypeIds = [];
	    this.selectedDatasetIds = [];
	    this.selectedSectorIds = [];
	    this.selectedScenarioIds = [];
	    this.selectedSpeciesIds = [];
		this.selectedSpeciesGroupIds = [];
		this.selectedResolutionIds = [];
		this.selectedGeospatialIds = [];
		this.slider.minValue = new Date().getFullYear();
		this.slider.maxValue = new Date().getFullYear();
		this.noScenarios = false;
		this.noSectors = false;
		this.noSpecies = false;
    },
	
    datatypeChanged: function(datatype) {
    	
		// select only this datatype
		if(this.selectedDatatypeIds) {
    		this.selectedDatatypeIds = [];
    	}
    
    	this.selectedDatatypeIds.push(datatype.id);	
    	
    	// get all possible species
		var tempSpeciesIds = [];
		this.noSpecies = true;
	    this.$http.get(this.eccadConfig.api +"data/parameters/" + datatype.id)
	         .then(function (result) {
	        	  result.data.forEach(function(species) {
	             	  if(species.id > 0) {
	        		    tempSpeciesIds.push(species.id);
	             	  }
	        	  });
				// only select those who are already selected, if there are already species selected
				if(this.selectedSpecies && this.selectedSpecies.length > 0) {	
					var tmp =tempSpeciesIds.filter(function(n) {
						return this.selectedSpeciesIds.indexOf(n) !== -1;
					});
					this.selectedSpeciesIds = tmp;
					this.selectedSpeciesIds.forEach(function (speciesId) {
						this.getSpeciesGroupsBySpecies(speciesId);
				    });
				}
				else {
					this.selectedSpeciesIds = tempSpeciesIds;
					this.selectedSpeciesIds.forEach(function (speciesId) {
				    	// this.getSpeciesGroupsBySpecies(speciesId);
				    });
				}
	         });
	    
	    
    
	    var initial = false;
	    if(this.selectedDatasetIds.length < 1) {
	    	initial = true;
	    }
    	// get all possible inventories
    	this.$http.get(this.eccadConfig.api +"data/inventoriesbycategory?categoryid=" + datatype.id)
         .then(function (result) {
            result.data.forEach(function(r) {
				if(this.selectedDatasetIds && this.selectedDatasetIds.indexOf(r.id) < 0) {
					this.selectedDatasetIds.push(r.id);	
					
					this.getResolutions(r.id, initial);
					this.getInterval(r.id, datatype.id);
					this.getSectors(r.id, initial);
					this.getScenarios(r.id, initial);
				}
            });
        }); 
    }, 

   speciesChanged : function(species) {
       
        // already a species selection
      	if(this.selectedSpeciesIds) {
    	  this.selectedSpeciesIds = [];
    	}
		this.selectedSpeciesIds.push(species.id);
		this.getSpeciesGroupsBySpecies(species.id);

		if(selectedDatatypeIds[0] != null) {  
			// get inventories and categories by species
			var tempDatasetIds = [];
            for(var i = 0; i < this.selectedDatatypeIds.length; i++) {
				var catId = this.selectedDatatypeIds[i];
				this.getDatasetsBySpeciesAndCategory(species.id, catId);
			}
			
		}
		else {
			for(var i = 0; i < this.categories.length; i++) {
				this.getDatasetsBySpeciesAndCategory(species.id, categories[i].id);
			}
			
		}
		
	},

 datasetChanged : function(dataset) {
    	
		console.log(JSON.stringify(dataset));
    	if(this.selectedDatasetIds) {
          this.selectedDatasetIds = [];
    	}
    	this.selectedDatasetIds.push(dataset.id);
    	    	
       if(this.selectedDatatypeIds.length > 0 && this.selectedDatatypeIds[0] != -1) {
    	  
    	   var tempSpeciesIds = [];
    	   this.$http.get(this.eccadConfig.api +"data/parametersbyinventoryandcategory?categoryid="+ this.selectedDatatypeIds[0] + "&inventoryid=" + dataset.id)
         .then(function (result) {
        	 
        	   result.data.forEach(function(species) {   		
  	             	if(species.id > 0) {
  	             		tempSpeciesIds.push(species.id);
  	             	}
  	     	 	});    
  				// only select those who are already selected, if there are already species selected
  				if(this.selectedSpeciesIds && this.selectedSpeciesIds.length > 0) {	
  					var tmp = tempSpeciesIds.filter(function(n) {
  						return this.selectedSpeciesIds.indexOf(n) !== -1;
  					});
  					this.selectedSpeciesIds = tmp;
//  					tmp.forEach( function(s) {
//  						$scope.selectedSpeciesIds.push(s);
//  					});
  				}
  				else {
  				  this.selectedSpeciesIds = tempSpeciesIds;
  				}  
  				this.selectedSpeciesIds = _.uniq(selectedSpeciesIds);
        	  });
       
    	   this.getInterval(dataset.id, this.selectedDatatypeIds[0]);
       } 
       else  {
    	   /* var aux = [];
   
    	   // try for every combination of inventory and category 
    	   for(var i = 0; i < $rootScope.categories.length ; i++) {
	    	   params = {
	    			   "categoryid": $rootScope.categories[i].id , 
	    			   "inventoryid": dataset.id,
	    	   }	   	    	  
	    	   aux.push(params);
    	   }
     	   
    	   aux.forEach(function (params) {
	    	   $http.get(eccadConfig.api +"data/parametersbyinventoryandcategory", {'params' : params})
	            .then(function (result) {
	        	   var tempSpeciesIds = [];
	        	   result.data.forEach(function(species) {
	        		    if(species.id > 0) {
	        		    	tempSpeciesIds.push(species.id);
	        		    }
	  	     	 	});    
	        	   
	  				// only select those who are already selected, if there are already species selected
	  				if($scope.selectedSpeciesIds && $scope.selectedSpeciesIds.length > 0) {	
	  					var tmp = tempSpeciesIds.filter(function(n) {
	  						return $scope.selectedSpeciesIds.indexOf(n) !== -1;
	  					});
	  					// $scope.selectedSpeciesIds = tmp;
	  					tmp.forEach( function(s) {
	  						$scope.selectedSpeciesIds.push(s);
	  					});
	  				}
	  				else {
	  					$scope.selectedSpeciesIds = tempSpeciesIds;
	  				}  
	  				$scope.selectedSpeciesIds = _.uniq($scope.selectedSpeciesIds);
	  				
	  			   if(tempSpeciesIds.length > 0) {
	  				  //add the datatype
	  				  $scope.selectedDatatypeIds.push(params.categoryid);  
	  				  // get the interval
	  		          getInterval(dataset.id, params.categoryid);
	          	   }
	        	 });         
    	   });*/
       } 
      
   	   this.getResolutions(dataset.id, false);
   	   this.getSectors(dataset.id, false);
	   this.getScenarios(dataset.id, false);
    	
    },
 
 sectorChanged : function(sector) {
 	
	if(this.selectedSectorIds) {
 	  this.selectedSectorIds = [];
 	}
 	this.selectedSectorIds.push(sector.id);
 	
 	// get inventories by sector
    for(var i = 0; i < this.selectedSectorIds.length; i++) {
			this.$http.get(this.eccadConfig.api + "data/inventoriesbysector?sectorid=" + sector.id)
				.then(function (result) {
			  // get the inventory and add the category
			  if(result.data.length > 0) {	  
				  result.data.forEach(function(inv) {
					  if(this.selectedDatasetIds.indexOf(inv.id) < 0) {
					    this.selectedDatasetIds.push(inv.id);	
					  } 
				  });
			  }
			});
      }
 	
 },
 
 scenarioChanged : function(scenario) {
	 	
	if(this.selectedScenarioIds) {
 	  this.selectedScenarioIds = [];
 	}
 	this.selectedScenarioIds.push(scenario.id);
 	
 	// get inventories by scenario
     for(var i = 0; i < this.selectedScenarioIds.length; i++) {
			this.$http.get(this.eccadConfig.api + "data/inventoriesbyscenario?scenarioid=" + scenario.id)
				.then(function (result) {
				  // get the inventory and add the category
				  if(result.data.length > 0) {	  
					  result.data.forEach(function(inv) {
						  if(this.selectedDatasetIds.indexOf(inv.id) < 0) {
							  this.selectedDatasetIds.push(inv.id);	
						  } 
					  });
				  }
			});
      }	
 },
 
 speciesGroupChanged : function(speciesGroup) {
 	
	if(this.selectedSpeciesGroupIds) {
 	  this.selectedSpeciesGroupIds = [];
 	}
	this.selectedSpeciesGroupIds.push(speciesGroup.id);
		
	  var initial = false;
	  if(this.selectedDatasetIds.length > 0) {
		  initial = true;
	  }
   // if($scope.selectedSpeciesGroupIds.length > 0 && $scope.selectedSpeciesGroupIds[0] != -1) {
 	  
	  var tmpSpeciesIds = []; 
      this.$http.get(this.eccadConfig.api +"data/parametersbygroup?parametergroupid="+ speciesGroup.id)
      .then(function (result) {
     	  result.data.forEach(function(species) {
     		   tmpSpeciesIds.push(species.id);	
     		 });

			 if(this.selectedSpeciesIds.length > 0) {
				var tmp =tmpSpeciesIds.filter(function(n) {
					return this.selectedSpeciesIds.indexOf(n) !== -1;
				});
				this.selectedSpeciesIds = tmp;
			 } 
			 else {
			 	this.selectedSpeciesIds = tmpSpeciesIds;
			 }

			 this.selectedSpeciesIds.forEach(function(speciesId) {

				var tmpDatatypes = []; 
				if(this.selectedDatatypeIds.length > 0) {
					tmpDatatypes = this.selectedDatatypeIds;
				} 
				else {
					//$rootScope.categories.forEach(function(c) {
						// if(c.id > 0) {
						//  tmpDatatypes.push(c.id);
						//}
					//});
				}
				// console.log("categories: " + JSON.stringify(tmpDatatypes));
				tmpDatatypes.forEach( function(datatypeId) {
				this.$http.get(this.eccadConfig.api + "data/inventories/" + speciesId + "/" + datatypeId, {email : "sabine.darras@obs-mip.fr"})
  				.then(function (result) {

  				 console.log("number of datasets: " + result.data.length);	
  				 var tempDatasetIds = [];
				  // get the inventory, if there is a result (other than select)
				  if(result.data.length > 1) {
					  
					  this.selectedDatatypeIds.push(datatypeId);
				  
				  result.data.forEach(function(inv) {
					    if(inv.id > 0) {
	             		  tempDatasetIds.push(inv.id);
					    }
	        	  });
				
				 // only select those who are already selected, if there are already datasets selected
					if(initial) {	
						var tmp = tempDatasetIds.filter(function(n) {
							return this.selectedDatasetIds.indexOf(n) !== -1;
						});
						this.selectedDatasetIds = tmp;
					}
					else {
						tempDatasetIds.forEach(function(d) {
						  this.selectedDatasetIds.push(d);
						});
						this.selectedDatasetIds = _.uniq(this.selectedDatasetIds);
							
					}
					for(var j = 0; j < this.selectedDatasetIds.length; j++) {
						this.getSectors(this.selectedDatasetIds[j], true);
						this.getScenarios(this.selectedDatasetIds[j], true);
						this.getResolutions(this.selectedDatasetIds[j], true);
					}
					// console.log(JSON.stringify($scope.selectedDatasetIds));
				 }
	         });
			 });

			 }); 
     	  });
      //}); 
//	   } 
//    else  {
// 	 	// select datatypes
//
//			// then go over the datatypes and choose the species, sectors and scenarios 
//
//
// 	 }
 	
 },
 
 geoChanged : function(geo) {
   if(this.selectedGeoIds) {
     this.selectedGeoIds = [];
   }
   this.selectedGeoIds.push(geo.id);
 },
 
 resolutionChanged : function(resolution) {
   if(this.selectedResolutionIds) {
     this.selectedResolutionIds = [];
   }
   this.selectedResolutionIds.push(resolution.id);
 },

geospatialChanged : function(geospatial) {
   if(this.selectedGeospatialIds) {
     this.selectedGeospatialIds = [];
   }
   this.selectedGeospatialIds.push(geospatial.id);
 },
 
    datatypeClass : function(datatype) {
    	// setClassName(datatype, $scope.selectedDatatypeIds);
    	if(!this.selectedDatatypeIds) {
    		return '';
    	}
    	if (this.selectedDatatypeIds && this.selectedDatatypeIds.indexOf(datatype.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedDatatypeIds.length > 0 && this.selectedDatatypeIds.indexOf(datatype.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    datasetClass : function(dataset) {
    	// setClassName(dataset, $scope.selectedDatasetIds);
    	if(!this.selectedDatasetIds) {
    		return '';
    	}
    	if (this.selectedDatasetIds && this.selectedDatasetIds.indexOf(dataset.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedDatasetIds.length > 0 && this.selectedDatasetIds.indexOf(dataset.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    sectorClass : function(sector) {
    	if (!this.selectedSectorIds) {
    		return '';
    	}
    	if (this.selectedSectorIds && this.selectedSectorIds.indexOf(sector.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedSectorIds.length > 0 && this.selectedSectorIds.indexOf(sector.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if (this.selectedSectorIds.length < 1 && this.noSectors) {
    		return 'overviewDisabled';
    	}
    }, 
    
    speciesClass : function(species) {
    	if(!this.selectedSpeciesIds) {
    		return '';
    	}
    	if (this.selectedSpeciesIds && this.selectedSpeciesIds.indexOf(species.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedSpeciesIds.length > 0 && this.selectedSpeciesIds.indexOf(species.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if (this.selectedSpeciesIds.length < 1 && this.noSpecies) {
    		return 'overviewDisabled';
    	}
    }, 
    
	speciesGroupClass : function(speciesGroup) {
    	if(!this.selectedSpeciesGroupIds) {
    		return '';
    	}
    	if (this.selectedSpeciesGroupIds && this.selectedSpeciesGroupIds.indexOf(speciesGroup.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedSpeciesGroupIds.length > 0 && this.selectedSpeciesGroupIds.indexOf(speciesGroup.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    
    scenarioClass : function(scenario) {
    	if(!this.selectedScenarioIds) {
    		return '';
    	}
    	if (this.selectedScenarioIds && this.selectedScenarioIds.indexOf(scenario.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedScenarioIds.length > 0 && this.selectedScenarioIds.indexOf(scenario.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if (this.selectedScenarioIds.length < 1 && this.noScenarios) {
    		return 'overviewDisabled';
    	}
    	
    }, 
    
    geoClass : function(geo) {
    	
     	if(!this.selectedGeoIds) {
    		return '';
    	}
    	if (this.selectedGeoIds && this.selectedGeoIds.indexOf(geo) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedScenarioIds.length > 0 && this.selectedScenarioIds.indexOf(geo) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
  resolutionClass : function(res) { 	
     	// setClassName(res, $scope.selectedResolutionIds);
    	if(!this.selectedResolutionIds) {
    		return '';
    	}
    	if (this.selectedResolutionIds && this.selectedResolutionIds.indexOf(res.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedResolutionIds.length > 0 && this.selectedResolutionIds.indexOf(res.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 

	geospatialClass : function(geospatial) {
    	
     	if(!this.selectedGeospatialIds) {
    		return '';
    	}
    	if (this.selectedGeospatialIds && this.selectedGeospatialIds.indexOf(geospatial) >= 0) {
    		return 'overviewSelected';
    	}
    	if (this.selectedGeospatialIds.length > 0 && this.selectedGeospatialIds.indexOf(geospatial) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
  
  setClassName : function(item, array) {
	  if(!array) {
  		return '';
  	}
  	if (array && array.indexOf(item) >= 0) {
  		return 'overviewSelected';
  	}
  	if (array.length > 0 && array.indexOf(item) < 0) {
  		return 'overviewDisabled';
  	}
  },
  

   getSectors : function(datasetId, initial) {
     
	  this.noSectors = true; 
	  // get all possible sectors
      var tempSectorIds = [];
	  this.$http.get(this.eccadConfig.api +"data/sectors/"+ datasetId)
	         .then(function (result) {
	        	 
				  result.data.forEach(function(s) {
					if(s.id > 0) {  
	             	  tempSectorIds.push(s.id);
					}
	        	  });
				 
				// only select those who are already selected, if there are already sectors selected
				if(this.selectedSectorIds && this.selectedSectorIds.length > 0) {	
					var tmp = tempSectorIds.filter(function(n) {
						if(initial) {
							 return this.selectedSectorIds.indexOf(n) === -1;
							
							}
							else {
								return this.selectedSectorIds.indexOf(n) !== -1;	
							}
					});
					
					if(initial) {
						  tmp.forEach(function(s) {	
						    this.selectedSectorIds.push(s);
						  });
						}
						else {
						  this.selectedSectorIds = tmp;
						}
				}
				else {
				  this.selectedSectorIds = tempSectorIds;
				}
		        this.selectedSectorIds = _.uniq(this.selectedSectorIds);
	         });
	},
	
	
 getScenarios : function(datasetId, initial) {
  	
	   // get all possible scenarios
	  this.noScenarios = true; 
	  var tempScenarioIds = [];
		this.$http.get(this.eccadConfig.api +"data/scenarios/"+ datasetId)
	         .then(function (result) {   
	        	result.data.forEach(function(s) {
	             	if(s.id > 0) {
	        		 tempScenarioIds.push(s.id);
	             	}
	     	 	});    
	        	
				// only select those who are already selected, if there are already scenarios selected
				if(this.selectedScenarioIds && this.selectedScenarioIds.length > 0) {	
					var tmp = tempScenarioIds.filter(function(n) {
						if(initial) {
						  return this.selectedScenarioIds.indexOf(n) === -1;						
						}
						else {
						  return this.selectedScenarioIds.indexOf(n) !== -1;	
						}
					});
					if(initial) {
					  tmp.forEach(function(s) {	
					    this.selectedScenarioIds.push(s);
					  });
					}
					else {
					  this.selectedScenarioIds = tmp;
					}
				}
				else {
					this.selectedScenarioIds = tempScenarioIds;
				}  
		});	    
    },
 
  getInterval : function(inventoryId, datatypeId) {
	  	
	    // get the interval
		this.$http.get(this.eccadConfig.api +"data/inventorycategory/" + inventoryId +"/" + datatypeId)
	         .then(function (result) {   
	        	
	        	var min = parseInt(result.data.startDate.substring(0,4));
	        	var max = parseInt(result.data.endDate.substring(0,4));
	        	if(this.slider.minValue > min) {
	        	  this.slider.minValue = min;
	        	}
	        	if(slider.maxValue < max) {
	        	  this.slider.maxValue = max;
	        	}
		});
  },	

  getResolutions : function(inventoryId, initial) {
	  	
	    // get the resolution
	    var tempResolutionIds = [];
		this.$http.get(this.eccadConfig.api +"dataanalysis/resolutions/" + inventoryId)
	         .then(function (result) {   
				
	        	 result.data.forEach(function(s) {
		             	tempResolutionIds.push(s.id);	
		        	  });
					 
					// only select those who are already selected, if there are already resolutions selected
					if(this.selectedResolutionIds && this.selectedResolutionIds.length > 0) {	
						
						if(initial) {
							tempResolutionIds.forEach(function (r) {
								this.selectedResolutionIds.push(r);
							});
							this.selectedResolutionIds = _.uniq($scope.selectedResolutionIds);
						}
						else {
						  var tmp = tempResolutionIds.filter(function(n) {
							return this.selectedResolutionIds.indexOf(n) !== -1;	
						  });		
						
//						  tmp.forEach(function(s) {	
//							    $scope.selectedResolutionIds.push(s);
//						  });
						  this.selectedResolutionIds = tmp;
						}				
					}
					else {
						this.selectedResolutionIds = tempResolutionIds;
					}
					
		});	
	        	    
 }, 
  
 getDatasetsBySpeciesAndCategory : function(speciesId, categoryId) {
	 var tempDatasetIds = [];
	 this.$http.get(this.eccadConfig.api + "data/inventories/" + speciesId + "/" + categoryId, {email : "sabine.darras@obs-mip.fr"})
	.then(function (result) {	
	 
	  // get the inventory and add the category, if there is a result (other than select)
	  if(result.data.length > 1) {	  
	    this.selectedDatatypeIds.push(categoryId);
	  
	  result.data.forEach(function(inv) {
   		if(inv.id > 0) {
		  tempDatasetIds.push(inv.id);	 
   		  this.getInterval(inv.id, categoryId);
   		}
	  });
	 // only select those who are already selected, if there are already datasets selected
		if(this.selectedDatasetIds.length > 0) {	
			var tmp = tempDatasetIds.filter(function(n) {
				return this.selectedDatasetIds.indexOf(n) !== -1;
			});
			this.selectedDatasetIds = tmp;
		}
		else {
		  this.selectedDatasetIds = tempDatasetIds;
		}
		// console.log(JSON.stringify($scope.selectedDatasetIds));
		for(var j = 0; j < selectedDatasetIds.length; j++) {
	  		this.getSectors(selectedDatasetIds[j], true);
			this.getScenarios(selectedDatasetIds[j], true);
			this.getResolutions(selectedDatasetIds[j], true);
		}
	 }
   });
  },	
    
  getSpeciesGroupsBySpecies : function(speciesId) {
	this.$http.get(this.eccadConfig.api + "data/parametergroupbyparameter", {params: {'parameterid' : speciesId}})
		.then(function (result) {	
			this.selectedSpeciesGroupIds.push(result.data.id);		
		});
	this.selectedSpeciesGroupIds = _.uniq(this.selectedSpeciesGroupIds);
  },

  getGeospatials : function(geospatial) {  
	this.selectedGeospatialIds.push(geospatial.id);		
	this.selectedGeospatialIds = _.uniq(this.selectedGeospatialIds);
  },
  
  
  addDatatype: function(datatypeId, initial) {
	  if(initial) {
		  this.selectedDatatypeIds.push(datatypeId);
	  }
	  else {
		  //TODO
	  }
  }
  }
}

</script>

<style>
</style>