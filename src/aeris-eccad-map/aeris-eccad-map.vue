<template>
  <!--span v-if="visible"-->
  <span>	  
    <div :id="name"></div>
  </span>
</template>

<script>

import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';

export default {
  props: {
    service:  {
      type: String,
      default: ''
    },
	name: {
	  type: String,
      default: 'map'
	},
    first: {
      type: Boolean,
      default: true    
    },
    compare: {
      type: Boolean,
      default: false  
    },
	small: {
	  type: Boolean,
	  default: false
	}
  },
  
  data () {
    return {
       mapService: this.service,
       grids: [],
	   mapParameters: {},
	   regionParameters: {},
	   useMask: false,
	   maskPrefix: '',
       parameter: {},
       dataset: {},
       sector: {},
       sectorname: String,
       scenario: {},
       unit: {},
       file: {},
       beginDate: {},
       logScale: true,
       numColors: 20,
       color: 'rainbow',
       isTotal: false,
	   visible: false,
	   mainmenu: '',
    }
  },
  
   watch: {
    service (value) {
	      this.mapService = value
    },
	mainmenu (value) {
	  console.log("main menu changed: " + JSON.stringify(this.mainmenu))
	  if(this.mainmenu === 'tools') {
		this.visible = true
	  }
	  else {
	    this.visible = false	  
	  }
    },
    file (value) {
    	console.log("in map, file changed: " + JSON.stringify(value));
        this.getGrids();
    },
    sector (value) {
        console.log("in map, sector changed: " + JSON.stringify(value));
    	this.getGrids();
    },
    sectorname (value) {
        console.log("in map, sectorname changed: " + JSON.stringify(value));
    	this.getGrids();
    },
    parameter (value) {
        console.log("in map, parameter changed: " + JSON.stringify(value));
    	this.getGrids();
    },    
  },
  computed: {  
  },
  
  mounted: function () {
  },
    
  destroyed: function() {
  },
  
  created: function () {
    EventBus.$on('useMask', data => {
		   this.useMask = data;
		});
	EventBus.$on('mainmenu', data => {
		   this.mainmenu = data;
		});

    if(this.first && !this.compare) {
       EventBus.$on('dataset', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('parameter', data => {
		   this.parameter = JSON.parse(data);
		});
		EventBus.$on('sector', data => {
		   this.sector = JSON.parse(data);
		});
		EventBus.$on('sectorname', data => {
		   this.sectorname = data;
		});
		EventBus.$on('scenario', data => {
		   this.scenario = JSON.parse(data);
		});
		EventBus.$on('unit', data => {
		   this.unit = JSON.parse(data);
		});
		EventBus.$on('file', data => {
		   this.file = JSON.parse(data);
		});
        EventBus.$on('beginDate', data => {
		   this.beginDate = JSON.parse(data);
		});
    }
    else if (!this.first && !this.compare) {
     	EventBus.$on('dataset2', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('parameter2', data => {
		   this.parameter = JSON.parse(data);
		});	
		EventBus.$on('sector2', data => {
		   this.sector = JSON.parse(data);
		});
		EventBus.$on('sectorname2', data => {
		   this.sectorname = data;
		});
		EventBus.$on('scenario2', data => {
		   this.scenario = JSON.parse(data);
		});
		EventBus.$on('unit2', data => {
		   this.unit = JSON.parse(data);
		});
		EventBus.$on('file2', data => {
		   this.file = JSON.parse(data);
		});
        EventBus.$on('beginDate', data => {
		   this.beginDate = JSON.parse(data);
		});
    }
    else {
        // TODO
    }  
    // EventBus.$on('mapParameters', this.draw());
    // EventBus.$on('regionParameters', this.draw());
    
  },
  
  methods: {

    getGrids: function() {
     
      if(this.file && this.file[0] && this.file[0].id && this.sector && this.sector.id && this.parameter) {    
        this.grids = [];
        this.mapParams = {};
        this.$http.get("http://eccad.aeris-data.fr/eccad2web/rest/data/grids?fileid=" + this.file[0].id + "&param=" + this.parameter.displayName + "&mask=" + this.useMask + "&total=" + this.isTotal + "&sectorid=" + this.sector.id)
            .then(function(result){

            this.grids = result.data;
            
            // min max selection bar
            var min = this.grids[0].minGrid.toPrecision(4).toUpperCase();
            var max = this.grids[0].maxGrid.toPrecision(4).toUpperCase();
            var totalValue = this.grids[0].sumGrid.toPrecision(4);
            
            // begindates and enddates select selection bar
            var beginDates = [];
            var endDates = [];
            this.grids.forEach(function(g) {
                beginDates.push({id : g.id, date : g.dateString});
                endDates.push({id : g.id, date : g.dateString});
            });

            var beginDateIndex = 0;
            var selectedBegindate = beginDates[0];
            this.beginDate = beginDates[0];
            var selectedEnddate = endDates[endDates.length-1];
            
            // set mapParams
            this.mapParams.isCombine = false;
            this.mapParams.layer = '';
            this.mapParams.colorScaleRange =  this.correctedMin(min) + "%2C" + max; 
            this.mapParams.min = this.correctedMin(min);
            this.mapParams.max = max;
            this.mapParams.time = beginDates[0].date;
            this.mapParams.totalValue = totalValue;
            this.mapParams.filename = this.file[0].name;
            this.mapParams.boundingBox = {latMin: -180, latMax: 180, lonMin: -90, lonMax: 90};

            if(this.first) {
            EventBus.$emit('beginDates', JSON.stringify(beginDates));
            EventBus.$emit('endDates', JSON.stringify(beginDates));
            EventBus.$emit('mapParams', JSON.stringify(beginDates));
          }
          else {
            EventBus.$emit('beginDates2', JSON.stringify(beginDates));
            EventBus.$emit('endDates2', JSON.stringify(beginDates));
            EventBus.$emit('mapParams2', JSON.stringify(beginDates));    
          }
          this.draw();          
        });
      } 
    },  

    correctedMin: function(value) {
         // TODO
         return value;
    },  
  
    /* refresh: function() {
      
      // color range and logscale: todo  
      if (this.mapService && this.sectorname && this.file && this.file[0].name && this.beginDate) {	    
  	    var fileName = this.file[0].name;
  	    console.log(fileName);  

        var colorScaleRange = this.beginDate.min + " " + this.beginDate.max;

        var params = {
            'FORMAT' : 'image/png',
            'TRANSPARENT' : false,
            'LAYERS' : this.sectorname,
            'TIME' :  this.mapParams.beginDate+ 'T00%3A00%3A00.000Z',
            'COLORSCALERANGE' : this.mapParams.colorScaleRange,
            'LOGSCALE' : this.logScale,
            'BGCOLOR' : '0xFFFFFF',
            'BELOWMINCOLOR' : '0xFFFFFF',
            'ABOVEMAXCOLOR' : 'extend',
            'NUMCOLORBANDS' : this.numColors,
            'STYLES' : 'boxfill/'+ this.color,
            'VERSION' : '1.1.1'
        }


  	    var url = this.barchartService  + "?filename=" + fileName + "&sector=" + this.sectorname + "&type=" + this.cType;
	    this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)}); 	   																																																																																																																																																																																																											}
      }
  }, */

    setMask: function(mask) {
	  if(mask && mask.length > 0) {
        this.useMask = true;
		this.maskPrefix = mask;
	  }
	  else {
	    this.useMask = false;
		this.maskPrefix = '';
	  }
	},
  
    draw: function() {
	 
	  // remove all existing childs from div
	  var idMap = "#" + this.name;
	  var el = this.$el.querySelector(idMap);

	  while (el.firstChild) {
         el.removeChild(el.firstChild);
      }

	    // color range and logscale: todo  
      if (this.mapService && this.sectorname && this.file && this.file[0].name && this.beginDate) {	    
  	    var fileName = this.file[0].name;
  	    console.log(fileName);  
        console.log(JSON.stringify(this.beginDate))  
        var params = {
             'FORMAT' : 'image/png',
            'TRANSPARENT' : false,
            'LAYERS' : this.sectorname,
            'TIME' :  this.beginDate.date + 'T00%3A00%3A00.000Z',
            'COLORSCALERANGE' : this.mapParams.colorScaleRange,
            'LOGSCALE' : this.logScale,
            'BGCOLOR' : '0xFFFFFF',
            'BELOWMINCOLOR' : '0xFFFFFF',
            'ABOVEMAXCOLOR' : 'extend',
            'NUMCOLORBANDS' : this.numColors,
            'STYLES' : 'boxfill/'+ this.color,
            'VERSION' : '1.1.1'
        }
 
        if(params.isRegion) {
		
		}
	    // world boundaries
		var worldBoundaries = new ol.source.TileWMS({
		        url : 'http://geonetwork3.fao.org/ows/14074',
		        params: {
		        'FORMAT' : 'image/png',
		        'LAYERS' : 'Country Boundaries',
		        'TRANSPARENT' : true
		        }
		    });
		
		var wbLayer = new ol.layer.Tile({
		        name: "world boundaries",
		        source : worldBoundaries
		    });
		
		 // empty map
		 var vmap = new ol.source.TileWMS({
		        url : ' http://vmap0.tiles.osgeo.org/wms/vmap0',
		        params: {
		        'FORMAT' : 'image/png',
		        'LAYERS' : 'basic',
		        'TRANSPARENT' : false
		        }
		    });
		
		var vmapLayer = new ol.layer.Tile({
		        name : "vmap",
		        source : vmap
		    });    
		
		
	   var mousePosition = new ol.control.MousePosition({
            coordinateFormat:  function(coordinate) {
                return ol.coordinate.format(coordinate, 'latitude: {x}, longitude: {y}', 2);
            },
            projection: 'EPSG:4326',
            target: document.getElementById("position1"),
            undefinedHTML: '&nbsp;'
        });
		
	   var view = new ol.View({
            center: [0,0], 
			// center: $rootScope.center,
            zoom: 2,
            minZoom: 2,
            projection: 'EPSG:4326'
        });
		
		
		   var mask = "";
            if(this.maskPrefix != "") {
                mask = this.maskPrefix + "_"
            }
            
            var totalDir = "";
            if(this.isTotal || this.maskPrefix != "") {
                totalDir = "totals/";
            }
            if(this.mapParams.isRegion && this.mapParams.layer.length > 1 && this.mapParams.useRegion) {
            	totalDir = "compare/";
            	mask = "";
            }
            
            
            // if(this.mapParams.colorScaleRange.toUpperCase().includes("E308")) {
	            console.log("thredds url: " + this.mapService + totalDir + mask +  fileName);
                var eccadSource = new ol.source.TileWMS({
	                    url: this.mapService + totalDir + mask +  fileName,
	                    params: params
	                });
	
	              var eccadLayer = new ol.layer.Tile({
	                    source : eccadSource
	                });  
            // }
                
		

        var overlayGroup = new ol.layer.Group({
		    title: 'Layers',
		    // layers: [eccadLayer, wbLayer]
			layers: [eccadLayer]
		});		
		 var map = new ol.Map({
                    target: this.name,
                    controls: ol.control.defaults().extend([
                        new ol.control.FullScreen()
                    ])
                }); 
            
          
		   map.addLayer(overlayGroup);
		   map.addControl(mousePosition);
           map.setView(view);
           this.setTimeSeries(map);  
		
      } 
	 },
	 
	 setTimeSeries: function(map) {
	      map.on("click", function(evt) {
	        var lon = evt.coordinate[0];
	        var lat = evt.coordinate[1];
	        
	        var threddsNcss = "http://thredds.sedoo.fr/thredds/ncss/grid/eccad/";
	        var mask = "";
	        var totals = "";
	        
	        //if($rootScope.maskPrefix.length > 1) {
	        //    mask = $rootScope.maskPrefix + "_";
	        //    totalsDir = "totals/";
	        //}
	        // get timeseries through thredds LET OP NU ALLEEN VOOR EERSTE MAP
	        // var url = threddsNcss + totals + mask + $rootScope.mapParams.filename + "?var=" + $rootScope.sectorExt + "&latitude=" + lat + "&longitude=" + lon + "&vertCoord=&accept=csv&time_start=" + $rootScope.mapParams.time + "T00%3A00%3A00Z&time_end=" + $rootScope.endDate 
			// $rootScope.endDates.length - 1].date + "T00%3A00%3A00Z";
	        // console.log(url);
	        // $http.get(url) 
	        // .then(function(result){
	         
	            //var data = result.data.split("\n");
	      
	            //var categories = [];
	            //var series = [];
	            //for(var i = 1; i < data.length-1 ; i++) {
	            	var tmp = data[i].split(",");
	            	
	            	$scope.timeSeriesSeries.push(parseFloat(tmp[3]));
	            	$scope.timeSeriesCategories.push(tmp[0]);
	            //}
	            // transform into highchartsmap
	            // and put in a modalform
	        	// console.log(JSON.stringify($scope.timeSeriesSeries));
	            // drawTimeSeries();
	  
	        //});          
        }); 
	 },
	 
	 drawTimeSeries: function() {
	 /* var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	            var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#ffbb78", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#aec7e8", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
	            
	            if($scope.timeSeriesSeries && $scope.timeSeriesSeries.length > 0) {
	               
	             
	                var yAxis = [{title: {
	                                text: $rootScope.totalUnit,
	                                style: {
	                                    fontSize: '14px',
	                                    fontWeight: 'bold'
	                                    }
	                                }
	                            }];
	                 
	                $scope.chart1 = new Highcharts.Chart('timeSeries', {
	                    chart: {
	                        type: 'column',
	                        // width: $scope.chartWidth,
	                        // height: h,
	                        zoomType: 'xy'
	                    },
	                    colors: colors,
	                    title: {
	                        text: ''
	                    },

	                    subtitle: {
	                        text: ''
	                    },

	                    xAxis: {
	                        title: {
	                            text: "Date",
	                            style: {
	                                fontSize: '14px',
	                                fontWeight: 'bold'
	                            }
	                        },
	                        labels: {
	                            style: {
	                                color: 'black',
	                                fontSize:'14px',
	                                fontWeight: 'bold'
	                            }
	                        }
	                    },
	                    yAxis: yAxis,
	                            labels: {
	                                style: {
	                                    fontSize:'14px',
	                                    fontWeight: 'bold'
	                                }
	                            },
	                    credits: {
	                        enabled: false
	                    },
	                    tooltip: {
	                        crosshairs: [true],
	                        enabled: true,
	                        formatter: function() {
	                            return  this.series.name + ' - ' + this.x + ': <b>' + this.y + '</b>';
	                        }
	                    },
	                    exporting: {
	                        buttons: {
	                            exportButton: {
	                                align: 'bottom',
	                                x: 40
	                            }
	                        }
	                    },  
	                    series: $scope.timeSeriesSeries  
	                });
	                }
	            } */
	 
	 }
}
}  

</script>

<style>

</style>