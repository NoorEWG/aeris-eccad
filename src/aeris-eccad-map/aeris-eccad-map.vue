<template>
  <div>	  
    <div class="mapTitleHeader">{{dataset.titre}} {{resolution.fullNameResolution}} {{datatype.shortName}} {{parameter.shortName}} {{scenario.displayNameScenario}} - {{beginDate.date}}</div>

   <div class="mapDiv">
	        <div class="mapWrapper">
	            <div id="position1" class="mapPosition"></div>    
	            <div class="toolsMap">
	                <div :id="name" ref="map"></div>
	            </div>
	        </div>    
	        <!--div id="toolsLegend" v-show="showLgv"-->
			<div id="toolsLegend">	
	            <img :id="legendId" :src="legendSrc" class="toolsLegend" />          
	        </div>
	        <!--div class="legendValues" v-show="showLgv"-->
			<div class="legendValues">
	                <div class="lv2"><b>{{ mapParams.max }}</b></div>
	                <div class="lv1"><b>{{ legend[8] }}</b></div>
	                <div class="lv1"><b>{{ legend[7] }}</b></div>
	                <div class="lv1"><b>{{ legend[6] }}</b></div>
	                <div class="lv1"><b>{{ legend[5] }}</b></div>
	                <div class="lv1"><b>{{ legend[4] }}</b></div>
	                <div class="lv1"><b>{{ legend[3] }}</b></div>
	                <div class="lv1"><b>{{ legend[2] }}</b></div>
	                <div class="lv1"><b>{{ legend[1] }}</b></div>
	                <div class="lv2"><b>{{ legend[0] }}</b></div>                
	                <div><b>{{ mapParams.min }}</b></div>
	        </div>
	    </div>
		<!--div id="timeSeriesModal" class="tsModalDialog">
        	<div>
            	<b>Time Series</b> 
				<input type="button" class="btn btn-default" value="export" @click="exportTimeSeries()" />
				<input type="button" class="btn btn-default" value="close" @click="closeModal()" />
            	<div :id="chartId"></div>
        </div-->
		<div :id="chartId"></div>
    </div>

	</div>	
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
	legendname: {
	  type: String,
      default: 'legImg'
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
	   mapParams: {},
	   regionParameters: {},
	   lat: '',
	   lon: '',
	   timeSeriesSeries: [{
		   series: [{
			   name: '',
			   data: []
		   }],
		   categories: []
	   }],
	   useMask: false,
	   maskPrefix: '',
       parameter: {},
	   datatype: {},
       dataset: {},
       sector: {},
       sectorName: String,
       scenario: {},
	   beginDate: {},
	   resolution: {},
       unit: {},	
       file: {},
       beginDate: {},
	   endDate: {},
       logScale: true,
       numColors: 20,
       color: 'rainbow',
       isTotal: false,
	   visible: false,
	   mainmenu: '',
	   legend: [],
	   legendSrc: '',
	   legendId: this.name + "Legend",
	   showLgv: false,
	   showModal: false,
	   chartId: this.name + "TimeSeries"
    }
  },
  
   watch: {
    service (value) {
	  this.mapService = value
    },
    file (value) {
      this.getGrids();
    },
    sector (value) {
	  if(value.name) {	
      this.getGrids();
	  }
    },
    sectorName (value) {
      if(value) {
	  	this.getGrids();
	  }
    },
    parameter (value) {
      this.getGrids();
    },
	isTotal (value) {
      this.getGrids();
    }
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
	EventBus.$on('isMask', data => {
		this.isMask = JSON.parse(data);
	});
	EventBus.$on('mapCoordinates', data => {
		var mapCoordinates = JSON.parse(data);
		this.lon = mapCoordinates.lon;
		this.lat = mapCoordinates.lat;
		this.setTimeSeries(this.lon, this.lat);
	});


    if(this.first && !this.compare) {
      	EventBus.$on('isTotal', data => {
			this.isTotal = JSON.parse(data);
		});
		EventBus.$on('dataset', data => {
	    	this.dataset = JSON.parse(data);
	  	});
		EventBus.$on('datatype', data => {
			this.datatype = JSON.parse(data);
		});
		EventBus.$on('parameter', data => {
			this.parameter = JSON.parse(data);
			this.parameterName = this.parameter.displayName;
		});
		EventBus.$on('sector', data => {
			this.sector = JSON.parse(data);
		});
		EventBus.$on('sectorname', data => {
			this.sectorName = JSON.parse(data);
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
		EventBus.$on('resolution', data => {
	    	this.resolution = JSON.parse(data);
	  	});
		EventBus.$on('beginDate', data => {
			this.beginDate = JSON.parse(data);
		});
		EventBus.$on('parameterName', data => {
			console.log("MAP, parameterName: " + data)
			this.parameterName = JSON.parse(data);
		});
		
    }
    else if (!this.first && !this.compare) {
     	EventBus.$on('isTotal2', data => {
			this.isTotal = JSON.parse(data);
		});
		EventBus.$on('dataset2', data => {
		   this.dataset = JSON.parse(data);
		});
		EventBus.$on('datatype2', data => {
		   this.datatype2 = JSON.parse(data);
		});
		EventBus.$on('parameter2', data => {
		   this.parameter = JSON.parse(data);
		   this.parameterName = this.parameter.displayName;
		});	
		EventBus.$on('sector2', data => {
		   this.sector = JSON.parse(data);
		});
		EventBus.$on('sectorname2', data => {
		   this.sectorName = JSON.parse(data);
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
		EventBus.$on('resolution2', data => {
	    	this.resolution = JSON.parse(data);
	  	});
        EventBus.$on('beginDate2', data => {
		   this.beginDate = JSON.parse(data);
		});
		EventBus.$on('parameterName2', data => {
			this.parameterName = JSON.parse(data);
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
     
      if(this.file && this.file[0] && this.file[0].id && this.sector && this.sector.id && this.parameterName) {    
        this.grids = [];
        this.mapParams = {};
        this.$http.get("http://eccad.aeris-data.fr/eccad2web/rest/data/grids?fileid=" + this.file[0].id + "&param=" + this.parameterName + "&mask=" + this.useMask + "&total=" + this.isTotal + "&sectorid=" + this.sector.id)
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
			this.endDate = selectedEnddate;
            
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
				EventBus.$emit('mapParams', JSON.stringify(this.mapParams));
				EventBus.$emit('min', JSON.stringify(min));
				EventBus.$emit('max', JSON.stringify(max));
          	}
          	else {
				EventBus.$emit('beginDates2', JSON.stringify(beginDates));
				EventBus.$emit('endDates2', JSON.stringify(beginDates));
				EventBus.$emit('mapParams2', JSON.stringify(beginDates));    
				EventBus.$emit('min2', JSON.stringify(min));
				EventBus.$emit('max2', JSON.stringify(max));
		  	}
          	this.draw(); 
		  	this.getLegend();         
        });
      } 
	  else {
		this.draw();
	  }
    },  

    correctedMin: function(value) {
         // TODO
         return value;
    },  
  
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
	  var el = this.$refs.map;
	  while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      
	  // color range and logscale: todo  
      if (this.mapService && this.sectorName && this.file && this.file[0].name && this.beginDate) {	    
  	    var fileName = this.file[0].name;
  	    var params = {
             'FORMAT' : 'image/png',
            'TRANSPARENT' : false,
            'LAYERS' : this.sectorName,
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
		  // TODO 
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
               
        // if(!this.mapParams.colorScaleRange.toUpperCase().includes("E308")) {
	    // console.log("thredds url: " + this.mapService + totalDir + mask +  fileName);
			var eccadSource = new ol.source.TileWMS({
					url: this.mapService + totalDir + mask +  fileName,
					params: params
				});

				var eccadLayer = new ol.layer.Tile({
					source : eccadSource
				});  
        // }
                
		
        if(this.sectorName && this.file && this.file[0].name && this.beginDate) {
			var overlayGroup = new ol.layer.Group({
				title: 'Layers',
				// layers: [eccadLayer, wbLayer]
				layers: [eccadLayer]
			});	
		}

		else {
			var overlayGroup = new ol.layer.Group({
				title: 'Layers',
				// layers: [eccadLayer, wbLayer]
				layers: [vmapLayer]
			});	
		}

		var map = new ol.Map({
                    target: this.name,
                    controls: ol.control.defaults().extend([
                        new ol.control.FullScreen()
                    ])
        		}); 
              
		map.addLayer(overlayGroup);
		map.addControl(mousePosition);
		map.setView(view);
		map.on("click", function(evt) {
	        this.lon = evt.coordinate[0];
	        this.lat = evt.coordinate[1];
			var mapCoordinates = {lon: evt.coordinate[0], lat: evt.coordinate[1] }
			EventBus.$emit("mapCoordinates", JSON.stringify(mapCoordinates));
			});	
        } 
	},
	 
    getLegend: function() {
           
           // position will be between 0 and 100
	    	var minp = 0;
	    	var maxp = 100;

                document.getElementById(this.legendId).src= 'http://thredds.sedoo.fr/thredds/wms/eccad/' + this.mapParams.filename + "?request=GetLegendGraphic&COLORBARONLY=true&WIDTH=15&HEIGHT=258&layer=sohefldo&NUMCOLORBANDS=" + this.numColors + "&palette=" + this.color.name;
	               	
	    		// The result should be between 100 an 10000000
	    		var minv = Math.log(this.mapParams.min);
	    		var maxv = Math.log(this.mapParams.max);
	
	    		// calculate adjustment factor
	    		var scale = (maxv - minv) / (maxp - minp);
	
                var legend = [];
	    		for (var i = 0; i < 10; i++) {
                    legend[i] = Math.exp(minv + scale * (((i+1) * 10) - minp)).toPrecision(4);
	    		}
				this.legend = legend;
	    		this.showLgv = true;
            
            
        },	

	 closeModal: function() {
		 this.showModal = false;
	 },

	 exportTimeSeries: function() {
		 // TODO
	 },	

	 setTimeSeries: function(lon, lat) {
	        
	        var threddsNcss = "http://thredds.sedoo.fr/thredds/ncss/grid/eccad/";
	        var mask = "";
	        var totals = "";
	        
	        if(this.maskPrefix.length > 1) {
	            mask = this.maskPrefix + "_";
	            totalsDir = "totals/";
	        }

			var fileName = this.file[0].name;
	        // get timeseries through thredds LET OP NU ALLEEN VOOR EERSTE MAP
	        var url = threddsNcss + totals + mask + this.mapParams.filename + "?var=" + this.sectorName + "&latitude=" + lat + "&longitude=" + lon + "&vertCoord=&accept=csv&time_start=" + this.mapParams.time + "T00%3A00%3A00Z&time_end=" + this.endDate.date + "T00%3A00%3A00Z"; 
	        console.log(url);
	        this.$http.get(url) 
	        	.then(function(result){
	         
	            var data = result.data.split("\n");
				var series = [];
				var categories = [];
	            for(var i = 1; i < data.length-1 ; i++) {
	            	var tmp = data[i].split(",");
	            	
	            	// this.timeSeriesSeries.push(parseFloat(tmp[3]));
					series.push(parseFloat(tmp[3]));
	            	categories.push(tmp[0].substring(0,10));
	            }
				this.timeSeriesSeries[0].series.push({name: "series", data: series});
				this.timeSeriesSeries[0].categories = categories;
	            // transform into highchartsmap and put in a modalform
	        	console.log(JSON.stringify(this.timeSeriesSeries));
	            this.drawTimeSeries();
	  
	        });          
    
	 },
	 
	 drawTimeSeries: function() {
	    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#ffbb78", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#aec7e8", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
		
		if(this.timeSeriesSeries && this.timeSeriesSeries.length > 0) {
			
			var series = [];
			series.push(this.timeSeriesSeries[0].series[1]);
			console.log(JSON.stringify(series));
			
			var yAxis = [{title: {
							text: this.totalUnit,
							style: {
								fontSize: '14px',
								fontWeight: 'bold'
								}
							}
						}];
				
			var chart = new Highcharts.Chart(this.chartId, {
				chart: {
					type: 'spline',
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
						text: "Time",
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
					},
					categories: this.timeSeriesSeries[0].categories,
				},
				yAxis: yAxis,
						labels: {
							style: {
								fontSize:'14px',
								fontWeight: 'bold'
							},
							formatter: function() {
                                return this.value.toExponential(2); // 2 digits of precision
                            }
						},
				credits: {
					enabled: false
				},
				legend: {
					enabled: false
				},
				tooltip: {
					crosshairs: [true],
					enabled: true,
					formatter: function() {
						return  '' + this.x + ': <b>' + this.y + '</b>';
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
				series: series 
			});
			}
		} 
	 
	 }

}  

</script>

<style>

</style>