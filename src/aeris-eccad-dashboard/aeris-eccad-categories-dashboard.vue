/*
 dependances: 
*/

<template>
    <div>
        <span class="overviewTitle">Categories</span> 
        <span class="eccadBadge" v-if="selectedDatatypeIds.length < 1 && categories.length >= selectedDatatypeIds.length">{{categories.length}}</span>
        <span class="eccadBadge" v-if="selectedDatatypeIds.length >= 1">{{selectedDatatypeIds.length}}</span>
        <ul class="overviewListW">
            <li v-for="datatype in categories" v-if="datatype.id > 0"
            
               
                v-on="datatypeChanged(datatype)">{{datatype.fullName}}</li>
        </ul>
    </div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';

export default {
 props: {
  },
  
  data () {
    return {
      selectedDatatypeIds : [],
      selectedDatasetIds : [],
	  selectedSectorIds : [],
	  selectedScenarioIds : [],
	  selectedSpeciesIds : [],
	  selectedSpeciesGroupIds : [],
	  selectedResolutionIds : [],
      slider : {
	    minValue: new Date().getFullYear(),
	    maxValue: new Date().getFullYear(),
	    options: {
	        floor: 1750,
	        ceil: 2200,
	        step: 5,
	        noSwitching: true
	    },
		noScenarios : false;
		noSectors : false;
		noSpecies : false;
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
  },
  
  computed: {
  },
  
  methods: {

	reset : function() {
		resetAll();
	},
	
    resetAll : function() {
	    selectedDatatypeIds = [];
	    selectedDatasetIds = [];
	    selectedSectorIds = [];
	    selectedScenarioIds = [];
	    selectedSpeciesIds = [];
		selectedSpeciesGroupIds = [];
		selectedResolutionIds = [];
		slider.minValue = new Date().getFullYear();
		slider.maxValue = new Date().getFullYear();
		noScenarios = false;
		noSectors = false;
		noSpecies = false;
        eccadConfig : {
            api : "http://eccad.aeris-data.fr/eccadweb/"
        }
    },
	
    datatypeChanged: function(datatype) {
    	
		// select only this datatype
		if(selectedDatatypeIds) {
    		selectedDatatypeIds = [];
    	}
    
    	selectedDatatypeIds.push(datatype.id);	
    	
    	// get all possible species
		var tempSpeciesIds = [];
		noSpecies = true;
	    $http.get(eccadConfig.api +"data/parameters/" + datatype.id)
	         .then(function (result) {
	        	  result.data.forEach(function(species) {
	             	  if(species.id > 0) {
	        		    tempSpeciesIds.push(species.id);
	             	  }
	        	  });
				// only select those who are already selected, if there are already species selected
				if(selectedSpecies && selectedSpecies.length > 0) {	
					var tmp =tempSpeciesIds.filter(function(n) {
						return selectedSpeciesIds.indexOf(n) !== -1;
					});
					selectedSpeciesIds = tmp;
					selectedSpeciesIds.forEach(function (speciesId) {
				    	getSpeciesGroupsBySpecies(speciesId);
				    });
				}
				else {
					selectedSpeciesIds = tempSpeciesIds;
					selectedSpeciesIds.forEach(function (speciesId) {
				    	getSpeciesGroupsBySpecies(speciesId);
				    });
				}
	         });
	    
	    
    
	    var initial = false;
	    if(selectedDatasetIds.length < 1) {
	    	initial = true;
	    }
    	// get all possible inventories
    	$http.get(eccadConfig.api +"data/inventoriesbycategory?categoryid=" + datatype.id)
         .then(function (result) {
         result.data.forEach(function(r) {
        	 if(selectedDatatypeIds.indexOf(r.id) < 0) {
        	    selectedDatasetIds.push(r.id);	
				
				getResolutions(r.id, initial);
        	    getInterval(r.id, datatype.id);
        	    getSectors(r.id, initial);
				getScenarios(r.id, initial);
        	 }
         	});
         });
    	
    }, 

   speciesChanged : function(species) {
       
        // already a species selection
      	if(selectedSpeciesIds) {
    		selectedSpeciesIds = [];
    	}
		selectedSpeciesIds.push(species.id);
		getSpeciesGroupsBySpecies(species.id);

		if(selectedDatatypeIds[0] != null) {  
			// get inventories and categories by species
			var tempDatasetIds = [];
            for(var i = 0; i < selectedDatatypeIds.length; i++) {
				var catId = selectedDatatypeIds[i];
				getDatasetsBySpeciesAndCategory(species.id, catId);
			}
			
		}
		else {
			for(var i = 0; i < categories.length; i++) {
				getDatasetsBySpeciesAndCategory(species.id, categories[i].id);
			}
			
		}
		
	},

 datasetChanged : function(dataset) {
    	
    	if(selectedDatasetIds) {
          selectedDatasetIds = [];
    	}
    	selectedDatasetIds.push(dataset.id);
    	    	
       if(selectedDatatypeIds.length > 0 && selectedDatatypeIds[0] != -1) {
    	  
    	   var tempSpeciesIds = [];
    	   $http.get(eccadConfig.api +"data/parametersbyinventoryandcategory?categoryid="+ $scope.selectedDatatypeIds[0] + "&inventoryid=" + dataset.id)
         .then(function (result) {
        	 
        	   result.data.forEach(function(species) {   		
  	             	if(species.id > 0) {
  	             		tempSpeciesIds.push(species.id);
  	             	}
  	     	 	});    
  				// only select those who are already selected, if there are already species selected
  				if(selectedSpeciesIds && selectedSpeciesIds.length > 0) {	
  					var tmp = tempSpeciesIds.filter(function(n) {
  						return selectedSpeciesIds.indexOf(n) !== -1;
  					});
  					selectedSpeciesIds = tmp;
//  					tmp.forEach( function(s) {
//  						$scope.selectedSpeciesIds.push(s);
//  					});
  				}
  				else {
  					selectedSpeciesIds = tempSpeciesIds;
  				}  
  				selectedSpeciesIds = _.uniq(selectedSpeciesIds);
        	  });
       
    	   getInterval(dataset.id, $scope.selectedDatatypeIds[0]);
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
      
   	   getResolutions(dataset.id, false);
   	   getSectors(dataset.id, false);
	   getScenarios(dataset.id, false);
    	
    },
 
 sectorChanged : function(sector) {
 	
	 if(selectedSectorIds) {
 		selectedSectorIds = [];
 	}
 	selectedSectorIds.push(sector.id);
 	
 	// get inventories by sector
     for(var i = 0; i < selectedSectorIds.length; i++) {
			$http.get(eccadConfig.api + "data/inventoriesbysector?sectorid=" + sector.id)
				.then(function (result) {
			  // get the inventory and add the category
			  if(result.data.length > 0) {	  
				  result.data.forEach(function(inv) {
					  if(selectedDatasetIds.indexOf(inv.id) < 0) {
						  selectedDatasetIds.push(inv.id);	
					  } 
				  });
			  }
			});
      }
 	
 },
 
 scenarioChanged : function(scenario) {
	 	
	 if(selectedScenarioIds) {
 		selectedScenarioIds = [];
 	}
 	selectedScenarioIds.push(scenario.id);
 	
 	// get inventories by scenario
     for(var i = 0; i < selectedScenarioIds.length; i++) {
			$http.get(eccadConfig.api + "data/inventoriesbyscenario?scenarioid=" + scenario.id)
				.then(function (result) {
				  // get the inventory and add the category
				  if(result.data.length > 0) {	  
					  result.data.forEach(function(inv) {
						  if(selectedDatasetIds.indexOf(inv.id) < 0) {
							  selectedDatasetIds.push(inv.id);	
						  } 
					  });
				  }
			});
      }	
 },
 
 speciesGroupChanged : function(speciesGroup) {
 	
	 if(selectedSpeciesGroupIds) {
 		selectedSpeciesGroupIds = [];
 	}
	selectedSpeciesGroupIds.push(speciesGroup.id);
		
	  var initial = false;
	  if(selectedDatasetIds.length > 0) {
		  initial = true;
	  }
   // if($scope.selectedSpeciesGroupIds.length > 0 && $scope.selectedSpeciesGroupIds[0] != -1) {
 	  
	  var tmpSpeciesIds = []; 
      $http.get(eccadConfig.api +"data/parametersbygroup?parametergroupid="+ speciesGroup.id)
      .then(function (result) {
     	  result.data.forEach(function(species) {
     		   tmpSpeciesIds.push(species.id);	
     		 });

			 if(selectedSpeciesIds.length > 0) {
				var tmp =tmpSpeciesIds.filter(function(n) {
					return selectedSpeciesIds.indexOf(n) !== -1;
				});
				selectedSpeciesIds = tmp;
			 } 
			 else {
			 	selectedSpeciesIds = tmpSpeciesIds;
			 }

			 selectedSpeciesIds.forEach(function(speciesId) {

				var tmpDatatypes = []; 
				if(selectedDatatypeIds.length > 0) {
					tmpDatatypes = selectedDatatypeIds;
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
				$http.get(eccadConfig.api + "data/inventories/" + speciesId + "/" + datatypeId, {email : "sabine.darras@obs-mip.fr"})
  				.then(function (result) {

  				 console.log("number of datasets: " + result.data.length);	
  				 var tempDatasetIds = [];
				  // get the inventory, if there is a result (other than select)
				  if(result.data.length > 1) {
					  
					  selectedDatatypeIds.push(datatypeId);
				  
				  result.data.forEach(function(inv) {
					    if(inv.id > 0) {
	             		  tempDatasetIds.push(inv.id);
					    }
	        	  });
				
				 // only select those who are already selected, if there are already datasets selected
					if(initial) {	
						var tmp = tempDatasetIds.filter(function(n) {
							return selectedDatasetIds.indexOf(n) !== -1;
						});
						selectedDatasetIds = tmp;
					}
					else {
						tempDatasetIds.forEach(function(d) {
							selectedDatasetIds.push(d);
						});
						selectedDatasetIds = _.uniq(selectedDatasetIds);
							
					}
					for(var j = 0; j < selectedDatasetIds.length; j++) {
						getSectors(selectedDatasetIds[j], true);
						getScenarios(selectedDatasetIds[j], true);
						getResolutions(selectedDatasetIds[j], true);
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
   if(selectedGeoIds) {
     selectedGeoIds = [];
   }
   selectedGeoIds.push(geo.id);
 },
 
 resolutionChanged : function(resolution) {
   if(selectedResolutionIds) {
     selectedResolutionIds = [];
   }
   selectedResolutionIds.push(resolution.id);
 },
 

    
    datatypeClass : function(datatype) {
    	// setClassName(datatype, $scope.selectedDatatypeIds);
    	if(!$scope.selectedDatatypeIds) {
    		return '';
    	}
    	if ($scope.selectedDatatypeIds && $scope.selectedDatatypeIds.indexOf(datatype.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedDatatypeIds.length > 0 && $scope.selectedDatatypeIds.indexOf(datatype.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    datasetClass : function(dataset) {
    	// setClassName(dataset, $scope.selectedDatasetIds);
    	if(!$scope.selectedDatasetIds) {
    		return '';
    	}
    	if ($scope.selectedDatasetIds && $scope.selectedDatasetIds.indexOf(dataset.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedDatasetIds.length > 0 && $scope.selectedDatasetIds.indexOf(dataset.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    sectorClass : function(sector) {
    	if (!$scope.selectedSectorIds) {
    		return '';
    	}
    	if ($scope.selectedSectorIds && $scope.selectedSectorIds.indexOf(sector.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedSectorIds.length > 0 && $scope.selectedSectorIds.indexOf(sector.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if ($scope.selectedSectorIds.length < 1 && $scope.noSectors) {
    		return 'overviewDisabled';
    	}
    }, 
    
    speciesClass : function(species) {
    	if(!$scope.selectedSpeciesIds) {
    		return '';
    	}
    	if ($scope.selectedSpeciesIds && $scope.selectedSpeciesIds.indexOf(species.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedSpeciesIds.length > 0 && $scope.selectedSpeciesIds.indexOf(species.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if ($scope.selectedSpeciesIds.length < 1 && $scope.noSpecies) {
    		return 'overviewDisabled';
    	}
    }, 
    
	speciesGroupClass : function(speciesGroup) {
    	if(!$scope.selectedSpeciesGroupIds) {
    		return '';
    	}
    	if ($scope.selectedSpeciesGroupIds && $scope.selectedSpeciesGroupIds.indexOf(speciesGroup.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedSpeciesGroupIds.length > 0 && $scope.selectedSpeciesGroupIds.indexOf(speciesGroup.id) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
    
    scenarioClass : function(scenario) {
    	if(!$scope.selectedScenarioIds) {
    		return '';
    	}
    	if ($scope.selectedScenarioIds && $scope.selectedScenarioIds.indexOf(scenario.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedScenarioIds.length > 0 && $scope.selectedScenarioIds.indexOf(scenario.id) < 0) {
    		return 'overviewDisabled';
    	}
    	if ($scope.selectedScenarioIds.length < 1 && $scope.noScenarios) {
    		return 'overviewDisabled';
    	}
    	
    }, 
    
    geoClass : function(geo) {
    	
     	if(!$scope.selectedGeoIds) {
    		return '';
    	}
    	if ($scope.selectedGeoIds && $scope.selectedGeoIds.indexOf(geo) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedScenarioIds.length > 0 && $scope.selectedScenarioIds.indexOf(geo) < 0) {
    		return 'overviewDisabled';
    	}
    }, 
    
  resolutionClass : function(res) { 	
     	// setClassName(res, $scope.selectedResolutionIds);
    	if(!$scope.selectedResolutionIds) {
    		return '';
    	}
    	if ($scope.selectedResolutionIds && $scope.selectedResolutionIds.indexOf(res.id) >= 0) {
    		return 'overviewSelected';
    	}
    	if ($scope.selectedResolutionIds.length > 0 && $scope.selectedResolutionIds.indexOf(res.id) < 0) {
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
     
	  noSectors = true; 
	  // get all possible sectors
      var tempSectorIds = [];
	  $http.get(eccadConfig.api +"data/sectors/"+ datasetId)
	         .then(function (result) {
	        	 
				  result.data.forEach(function(s) {
					if(s.id > 0) {  
	             	  tempSectorIds.push(s.id);
					}
	        	  });
				 
				// only select those who are already selected, if there are already sectors selected
				if(selectedSectorIds && selectedSectorIds.length > 0) {	
					var tmp = tempSectorIds.filter(function(n) {
						if(initial) {
							 return selectedSectorIds.indexOf(n) === -1;
							
							}
							else {
								return selectedSectorIds.indexOf(n) !== -1;	
							}
					});
					
					if(initial) {
						  tmp.forEach(function(s) {	
						    selectedSectorIds.push(s);
						  });
						}
						else {
						 selectedSectorIds = tmp;
						}
				}
				else {
					selectedSectorIds = tempSectorIds;
				}
		        selectedSectorIds = _.uniq(selectedSectorIds);
	         });
	},
	
	
 getScenarios : function(datasetId, initial) {
  	
	   // get all possible scenarios
	  noScenarios = true; 
	  var tempScenarioIds = [];
		$http.get(eccadConfig.api +"data/scenarios/"+ datasetId)
	         .then(function (result) {   
	        	result.data.forEach(function(s) {
	             	if(s.id > 0) {
	        		 tempScenarioIds.push(s.id);
	             	}
	     	 	});    
	        	
				// only select those who are already selected, if there are already scenarios selected
				if(selectedScenarioIds && selectedScenarioIds.length > 0) {	
					var tmp = tempScenarioIds.filter(function(n) {
						if(initial) {
						 return selectedScenarioIds.indexOf(n) === -1;
						
						}
						else {
							return selectedScenarioIds.indexOf(n) !== -1;	
						}
					});
					if(initial) {
					  tmp.forEach(function(s) {	
					    selectedScenarioIds.push(s);
					  });
					}
					else {
					  selectedScenarioIds = tmp;
					}
				}
				else {
					$scope.selectedScenarioIds = tempScenarioIds;
				}  
		});	    
    },
 
  getInterval : function(inventoryId, datatypeId) {
	  	
	    // get the interval
		$http.get(eccadConfig.api +"data/inventorycategory/" + inventoryId +"/" + datatypeId)
	         .then(function (result) {   
	        	
	        	var min = parseInt(result.data.startDate.substring(0,4));
	        	var max = parseInt(result.data.endDate.substring(0,4));
	        	if(slider.minValue > min) {
	        		slider.minValue = min;
	        	}
	        	if(slider.maxValue < max) {
	        		slider.maxValue = max;
	        	}
		});
  },	

  getResolutions : function(inventoryId, initial) {
	  	
	    // get the resolution
	    var tempResolutionIds = [];
		$http.get(eccadConfig.api +"dataanalysis/resolutions/" + inventoryId)
	         .then(function (result) {   
				
	        	 result.data.forEach(function(s) {
		             	tempResolutionIds.push(s.id);	
		        	  });
					 
					// only select those who are already selected, if there are already resolutions selected
					if(selectedResolutionIds && selectedResolutionIds.length > 0) {	
						
						if(initial) {
							tempResolutionIds.forEach(function (r) {
								selectedResolutionIds.push(r);
							});
							selectedResolutionIds = _.uniq($scope.selectedResolutionIds);
						}
						else {
						  var tmp = tempResolutionIds.filter(function(n) {
							return selectedResolutionIds.indexOf(n) !== -1;	
						  });		
						
//						  tmp.forEach(function(s) {	
//							    $scope.selectedResolutionIds.push(s);
//						  });
						  selectedResolutionIds = tmp;
						}				
					}
					else {
						selectedResolutionIds = tempResolutionIds;
					}
					
		});	
	        	    
 }, 
  
 getDatasetsBySpeciesAndCategory : function(speciesId, categoryId) {
	 var tempDatasetIds = [];
	 $http.get(eccadConfig.api + "data/inventories/" + speciesId + "/" + categoryId, {email : "sabine.darras@obs-mip.fr"})
	.then(function (result) {	
	 
	  // get the inventory and add the category, if there is a result (other than select)
	  if(result.data.length > 1) {	  
	    selectedDatatypeIds.push(categoryId);
	  
	  result.data.forEach(function(inv) {
   		if(inv.id > 0) {
		  tempDatasetIds.push(inv.id);	 
   		  getInterval(inv.id, categoryId);
   		}
	  });
	 // only select those who are already selected, if there are already datasets selected
		if(selectedDatasetIds.length > 0) {	
			var tmp = tempDatasetIds.filter(function(n) {
				return selectedDatasetIds.indexOf(n) !== -1;
			});
			selectedDatasetIds = tmp;
		}
		else {
			selectedDatasetIds = tempDatasetIds;
		}
		// console.log(JSON.stringify($scope.selectedDatasetIds));
		for(var j = 0; j < selectedDatasetIds.length; j++) {
	  		getSectors(selectedDatasetIds[j], true);
			getScenarios(selectedDatasetIds[j], true);
			getResolutions(selectedDatasetIds[j], true);
		}
	 }
   });
  },	
    
  getSpeciesGroupsBySpecies : function(speciesId) {
	  $http.get(eccadConfig.api + "data/parametergroupbyparameter", {params: {'parameterid' : speciesId}})
		.then(function (result) {	
			selectedSpeciesGroupIds.push(result.data.id);		
		});
	  selectedSpeciesGroupIds = _.uniq(selectedSpeciesGroupIds);
  },
  
  
  addDatatype: function(datatypeId, initial) {
	  if(initial) {
		  selectedDatatypeIds.push(datatypeId);
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