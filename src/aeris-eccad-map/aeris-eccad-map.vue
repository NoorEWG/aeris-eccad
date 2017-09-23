<template>
  <div>	  
    <div class="mapTitleHeader">{{ title }}</div>

   <div class="mapDiv">
	        <div :class="mapWrapper">
	            <div :id="position" class="mapPosition" v-show="showLgv"></div>    
	            <div class="toolsMap">
	                <div :id="name" :ref="name"></div>
	            </div>
	        </div>    
	        <div v-show="showLgv">
	            <img :id="legendId" :src="legendSrc" :class="toolsLegend" />          
	        </div>
	        <div :class="legendValues" v-show="showLgv">
	                <div class="lv2"><b>{{ max }}</b></div>
	                <div class="lv1"><b>{{ legend[8] }}</b></div>
	                <div class="lv1"><b>{{ legend[7] }}</b></div>
	                <div class="lv1"><b>{{ legend[6] }}</b></div>
	                <div class="lv1"><b>{{ legend[5] }}</b></div>
	                <div class="lv1"><b>{{ legend[4] }}</b></div>
	                <div class="lv1"><b>{{ legend[3] }}</b></div>
	                <div class="lv1"><b>{{ legend[2] }}</b></div>
	                <div class="lv1"><b>{{ legend[1] }}</b></div>
	                <div class="lv2"><b>{{ legend[0] }}</b></div>                
	                <div><b>{{ min }}</b></div>
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
	   chartId: this.name + "TimeSeries",
	   parameter2: {},
	   datatype2: {},
	   parameterName: '',
	   parameterName2: '',
       dataset2: {},
       sector2: {},
       sectorName2: String,
       scenario2: {},
	   beginDate2: {},
	   resolution2: {},
       unit2: {},	
       file2: {},
       beginDateIndex: 0,
	   beginDateIndex2: 0,
	   geospatial: {},
	   geospatial2: {},
	   latMin: -90,
	   latMax: 90,
	   lonMin: -180,
	   lonMax: 180,
	   title: '',
	   min: 0,
	   max: 0,
	   eccadConfig: {
		   api: 'http://eccad.aeris-data.fr/eccad2web/rest/'
	   }
    }
  },
  
   watch: {
   
	isTotal (value) {
      this.getGrids();
    },
	 compareParams (value) { 
	  this.draw();
    },

  },
  computed: {  
	mapWrapper: function () {
      if(this.small) {
		return 'mapWrapperSm';
	  }
	  else {
		return 'mapWrapper';
	  }
    },
	toolsLegend: function () {
      if(this.small) {
		return 'toolsLegendSm';
	  }
	  else {
		return 'toolsLegend';
	  }
    },
	legendValues: function () {
      if(this.small) {
		return "legendValuesSm";
	  }
	  else {
		return 'legendValues';
	  }
    },
	position: function() {
		return 'position' + this.name
	},
  },
  
  mounted: function () {
  },
    
  destroyed: function() {
  },
  
  created: function () {
	this.drawBaseMap();  
	document.addEventListener('parameter', this.setUseMap);
	document.addEventListener('mainmenu', this.setMainMenu);
	document.addEventListener('isMask', this.setMask);
	document.addEventListener('mapCoordinates', this.setMapCoordinates);
	document.addEventListener('geospatial', this.setGeoSpatial);
	document.addEventListener('isTotal', this.setTotal);
	document.addEventListener('isTotal2', this.setTotal2);
	document.addEventListener('category', this.setCategory);
    document.addEventListener('category2', this.setCategory2);
    document.addEventListener('parameter', this.setParameter);
    document.addEventListener('parameter2', this.setParameter2);
    document.addEventListener('dataset', this.setDataset);
    document.addEventListener('dataset2', this.setDataset2);
	document.addEventListener('sector', this.setSector);
    document.addEventListener('sector2', this.setSector2);
	document.addEventListener('scenario', this.setScenario);
    document.addEventListener('scenario2', this.setScenario2);
	document.addEventListener('sectorname', this.setSectorName);
    document.addEventListener('sectorname2', this.setSectorName2);
	document.addEventListener('unit', this.setUnit);
    document.addEventListener('unit2', this.setUnit2);
	document.addEventListener('file', this.setFile);
    document.addEventListener('file2', this.setFile2);
	document.addEventListener('resolution', this.setResolution);
    document.addEventListener('resolution2', this.setResolution2);	
    document.addEventListener('beginDate', this.setBeginDate);
    document.addEventListener('beginDate2', this.setBeginDate2);
	document.addEventListener('beginDateIndex', this.setBeginDateIndex);
    document.addEventListener('beginDateIndex2', this.setBeginDateIndex2);
	document.addEventListener('parameterName', this.setParameterName);
    document.addEventListener('parameterName2', this.setParameterName2);
  },
  
  methods: {

    setCategory: function(evt) {
       if(this.first) {
        this.datatype = evt.detail;
       }  
    },

    setCategory2: function(evt) {
       if(!this.first) {
        this.datatype = evt.detail;
       }  
	   if(this.compare) {
		this.datatype2 = evt.detail;
	   }
    },

    setParameter: function(evt) {
	  if(this.first) {
        this.parameter = evt.detail;
      } 
     },

    setParameter2: function(evt) {
       if(!this.first) {
        this.parameter = evt.detail;
       }
	   if(this.compare) {
		this.parameter2 = evt.detail;
	   }  
    },

    setDataset: function(evt) {
       if(this.first) {
        this.dataset = evt.detail;
       }  
    },

    setDataset2: function(evt) {
       if(!this.first) {
        this.dataset = evt.detail;
       }  
	   if(this.compare) {
		this.dataset = evt.detail;
	   }
    },

	setScenario: function(evt) {
       if(this.first) {
        this.scenario = evt.detail;
       }  
    },

	setScenario2: function(evt) {
       if(!this.first) {
        this.scenario = evt.detail;
       }
	   if(this.compare) {
		this.scenario2 = evt.detail;
	   }  
    },

	setSector: function(evt) {
       if(this.first) {
        this.sector = evt.detail;
       }  
    },
	setSector2: function(evt) {
       if(!this.first) {
        this.sector = evt.detail;
       }  
	   if(this.compare) {
		this.sector2 = evt.detail;
	   }
    },

	setSectorName: function(evt) {
       if(this.first) {
        this.sectorname = evt.detail;
       }  
	  
    },

	setSectorName2: function(evt) {
       if(!this.first) {
        this.sectorname = evt.detail;
       }  
	   if(this.compare) {
		this.sectorname2 = evt.detail;
	   }
    },

	setUnit: function(evt) {
       if(this.first) {
        this.unit = evt.detail;
       }  
    },

	setUnit2: function(evt) {
       if(!this.first) {
        this.unit = evt.detail;
       }
	   if(this.compare) {
		this.unit2 = evt.detail;
	   }  
    },

	setFile: function(evt) {
       if(this.first) {
        this.file = evt.detail;
		this.getGrids();
       }  
    },

	setFile2: function(evt) {
       if(!this.first) {
        this.file = evt.detail;
		this.getGrids();
       }  
	   if(this.compare) {
		this.file2 = evt.detail;
	   }
    },

	setResolution: function(evt) {
       if(this.first) {
        this.resolution = evt.detail;
       }  
    },

	setResolution2: function(evt) {
       if(!this.first) {
        this.resolution = evt.detail;
       }  
	   if(this.compare) {
		this.resolution2 = evt.detail;
	   }
    },

	setBeginDate: function(evt) {
       if(this.first) {
        this.beginDate = evt.detail;
       }  
    },

	setBeginDate2: function(evt) {
       if(!this.first) {
        this.beginDate = evt.detail;
       }  
	   if(this.compare) {
		this.beginDate2 = evt.detail;
	   }
    },

	setParameterName: function(evt) {
	   if(this.first) {
		console.log("PARAM NAME: " + JSON.stringify(evt.detail))   
        this.parameterName = evt.detail;
		this.getGrids();
       }  
    },

	setParameterName2: function(evt) {
	   if(!this.first) {
		console.log("PARAM NAME 2: " + JSON.stringify(evt.detail))   
        this.parameterName = evt.detail;
		this.getGrids();
       }  
	   if(this.compare) {
		this.parameterName2 = evt.detail;
	   }
    },

	setBeginDateIndex: function(evt) {
		if(this.compare) {
			this.beginDateIndex = evt.detail;
		}
	},

	setBeginDateIndex2: function(evt) { 
	   if(this.compare) {
		this.setBeginDateIndex2 = evt.detail;
	   }
    },

	setTotal: function(evt) { 
		if(this.first) {
        this.isTotal = evt.detail;
       } 
	},   

	setTotal2: function(evt) { 
		if(!this.first) {
        this.isTotal = evt.detail;
       }  
	   if(this.compare) {
		this.isTotal2 = evt.detail;
	   }
	},

    setUseMask: function(evt) {  
		this.useMask = evt.detail;
	},

	setMainMenu: function(evt) {  
		this.mainmenu = evt.detail;
	},

	setMask: function(evt) {  
		this.isMask = evt.detail;
	},
	
	setMapCoordinates: function(evt) {  
		var mapCoordinates = evt.detail;
		this.lon = mapCoordinates.lon;
		this.lat = mapCoordinates.lat;
		this.setTimeSeries(this.lon, this.lat);
	},

	setGeospatial: function(evt) {  
		this.geospatial = evt.detail;
		this.geospatial2 = evt.detail;
	},	

	setMapCompare: function(evt) {
		this.getCompareParams();
	},

    getCompareParams: function() {
		if(this.file && this.file[0] && this.file2 && this.file2[0]) {
		
			var params = {
            	"filename1" : this.file[0].name,
            	"filename2":  this.file2[0].name, 
            	"sector1": this.sectorName,
            	"sector2": this.sectorName2,
            	"gbl1": this.dataset.global,
            	"gbl2": this.dataset2.global,
            	"mask": this.maskPrefix,
            	"maskfile" : "",
            	"isRegion": false,
    			"regionName": "",
            	"date1": this.beginDateIndex,
            	"date2": this.beginDate2Index,
            	"latMin1": this.geospatial.latminGeospatial,
            	"latMax1": this.geospatial.latmaxGeospatial,
            	"lonMin1": this.geospatial.lonminGeospatial,
            	"lonMax1": this.geospatial.lonmaxGeospatial,
            	"latMinR": this.latMin,
            	"latMaxR": this.latMax,
            	"lonMinR": this.lonMin,
            	"lonMaxR": this.lonMax,
            	"latMin2": this.geospatial2.latminGeospatial,
            	"latMax2": this.geospatial2.latmaxGeospatial,
            	"lonMin2": this.geospatial2.lonminGeospatial,
            	"lonMax2": this.geospatial2.lonmaxGeospatial,
            	"total": this.isTotal,
				// TODO
            	// "region": this.mask.orderLegend,
            	// "operand": this.operand.sign, 
				"region": 0,
            	"operand": '+', 
    			"typecompare": 1
            } 	
		
	       // console.log(JSON.stringify(params));
		   this.$http.get(this.eccadConfig.api + "dataanalysis/mapcompare", {params : params})
           .then(function (result) { 
        	   var compareParams = result.data;
           	
           	     var minCompare = parseFloat(compareParams.min).toExponential(2).toString();
                 var maxCompare = parseFloat(compareParams.max).toExponential(2).toString();
				 this.min = minCompare;
				 this.max = maxCompare;
                 var averageCompare = compareParams.average.toExponential(2);
                 var stdCompare = compareParams.standardDeviation.toExponential(2);
                 var compareResult = {
					 maxCompare: maxCompare,
					 minCompare: -minCompare,
					 averageCompare: averageCompare,
					 stdCompare: stdCompare
				 }
				 console.log(JSON.stringify(compareResult));
				 EventBus.$emit("compareResult", JSON.stringify(compareResult));
				 compareParams.colorScaleRange = compareParams.min + "%2C" + compareParams.max; 
                 compareParams.filename = compareParams.combineFileName;            
                 compareParams.time = compareParams.time;
                 compareParams.layer = compareParams.sector;
				 // $rootScope.compareParams.totalValue = $rootScope.totalValue;
				 this.compareParams = compareParams;
				 this.draw();
				 this.getLegend();
				 // this.getTitle();  

        	   
           });
		}   
	},

	getTitle: function() {
		var scenario = ""
		if(this.scenario && this.displayNameScenario) {
			scenario = this.scenario.displayNameScenario; 
		}
		this.title = this.dataset.titre + " " +  this.resolution.fullNameResolution + " " + this.datatype.shortName + " " + this.parameter.shortName + " " + scenario + " - "  + this.beginDate.date;
	},

    getGrids: function() {
     
	console.log("GET GRIDS " + JSON.stringify(this.file) + " / " + JSON.stringify(this.sector) + " / " + JSON.stringify(this.parameterName));  
   	
      if(this.file && this.file[0] && this.file[0].id && this.sector && this.sector.id && this.parameter && this.parameterName) {    
        this.grids = [];
        this.mapParams = {};
        this.$http.get("http://eccad.aeris-data.fr/eccad2web/rest/data/grids?fileid=" + this.file[0].id + "&param=" + this.parameterName + "&mask=" + this.useMask + "&total=" + this.isTotal + "&sectorid=" + this.sector.id)
            .then(function(result){

            this.grids = result.data;
            // min max selection bar
            var min = this.grids[0].minGrid.toPrecision(4).toUpperCase();
            var max = this.grids[0].maxGrid.toPrecision(4).toUpperCase();
			this.min = min;
			this.max = max;
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

            if(this.first && !this.mapcompare) {
				var ev1 = new CustomEvent('beginDates', { 'detail': beginDates });
        		document.dispatchEvent(ev1); 
				var ev2 = new CustomEvent('endDates', { 'detail': beginDates });
        		document.dispatchEvent(ev2); 
				var ev3 = new CustomEvent('mapParams', { 'detail': this.mapParams });
        		document.dispatchEvent(ev3); 
				var ev4 = new CustomEvent('min', { 'detail': min });
        		document.dispatchEvent(ev4); 
				var ev5 = new CustomEvent('max', { 'detail': max });
        		document.dispatchEvent(ev5); 
          	}
          	if(!this.first && !this.mapcompare) {
				var ev1 = new CustomEvent('beginDates2', { 'detail': beginDates });
        		document.dispatchEvent(ev1); 
				var ev2 = new CustomEvent('endDates2', { 'detail': beginDates });
        		document.dispatchEvent(ev2); 
				var ev3 = new CustomEvent('mapParams2', { 'detail': this.mapParams });
        		document.dispatchEvent(ev3); 
				var ev4 = new CustomEvent('min2', { 'detail': min });
        		document.dispatchEvent(ev4); 
				var ev5 = new CustomEvent('max2', { 'detail': max });
        		document.dispatchEvent(ev5); 
		  	}
          	this.draw(); 
		  	this.getLegend();
			this.getTitle();             
        });
      } 
	  else {
		// TODO: empty map
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
  

    drawBaseMap: function() {
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

		var overlayGroup = new ol.layer.Group({
			title: 'Layers',
			// layers: [eccadLayer, wbLayer]
			layers: [vmapLayer]
		});	
		
		   // zoom on big or small map
	   var zoomLevel = 2;	
	   if(this.small) {
		 var zoomLevel = 1;
	   }
	   var view = new ol.View({
            center: [0,0], 
			// center: $rootScope.center,
            zoom: zoomLevel,
            minZoom: zoomLevel,
            projection: 'EPSG:4326'
        });

		var map = new ol.Map({
                    target: this.name,
                    controls: ol.control.defaults().extend([
                        new ol.control.FullScreen()
                    ])
        		}); 
              
		map.addLayer(overlayGroup);
		map.setView(view);	
	},

    draw: function() {
	
	  // remove all existing childs from div
	  var el = document.getElementById(this.name);
	  // var el = this.$refs.map;

	  while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

	  var params = {};
      var fileName = '';
	  if(this.compareParams && this.compareParams.combineFileName) {
		fileName = this.compareParams.combineFileName;
		params = {
				'FORMAT' : 'image/png',
				'TRANSPARENT' : false,
				'LAYERS' : this.compareParams.layer,
				'TIME' :  this.compareParams.time + 'T00%3A00%3A00.000Z',
				'COLORSCALERANGE' : this.compareParams.colorScaleRange,
				'LOGSCALE' : this.compareParams.linearScale,
				'BGCOLOR' : '0xFFFFFF',
				'BELOWMINCOLOR' : '0xFFFFFF',
				'ABOVEMAXCOLOR' : 'extend',
				'NUMCOLORBANDS' : this.numColors,
				'STYLES' : 'boxfill/redblue',
				'VERSION' : '1.1.1'
			}
			
	  }
	  else {
		// color range and logscale: todo  
		if (this.mapService && this.sectorName && this.file && this.file[0].name && this.beginDate && this.beginDate.date) {	    
			fileName = this.file[0].name;
			params = {
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
	    }
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
            target: document.getElementById(this.position),
            undefinedHTML: '&nbsp;'
        });
		
	   // zoom on big or small map
	   var zoomLevel = 2;	
	   if(this.small) {
		 var zoomLevel = 1;
	   }
	   var view = new ol.View({
            center: [0,0], 
			// center: $rootScope.center,
            zoom: zoomLevel,
            minZoom: zoomLevel,
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
		if(this.compare) {
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
			
         
	},
	 
    getLegend: function() {
           
           // position will be between 0 and 100
	    	var minp = 0;
	    	var maxp = 100;

			if(this.compare) {
				document.getElementById(this.legendId).src = 'http://thredds.sedoo.fr/thredds/wms/eccad/compare/'
						+ this.compareParams.filename
						+ "?request=GetLegendGraphic&COLORBARONLY=true&WIDTH=15&HEIGHT=258&layer=sohefldo&NUMCOLORBANDS="
						+ this.numColors + "&palette=redblue";	
			} else {
				document.getElementById(this.legendId).src= 'http://thredds.sedoo.fr/thredds/wms/eccad/' + this.mapParams.filename + "?request=GetLegendGraphic&COLORBARONLY=true&WIDTH=15&HEIGHT=258&layer=sohefldo&NUMCOLORBANDS=" + this.numColors + "&palette=" + this.color.name;
		
			}		

			if(!this.compare) {
				// The result should be between 100 an 10000000
				var minv = Math.log(this.mapParams.min);
				var maxv = Math.log(this.mapParams.max);

				// calculate adjustment factor
				var scale = (maxv - minv) / (maxp - minp);

				var legend = [];
				for (var i = 0; i < 10; i++) {
					legend[i] = Math.exp(minv + scale * (((i+1) * 10) - minp)).toPrecision(2);
				}
				this.legend = legend;
				this.showLgv = true;
			}
			if(this.compare && this.compareParams.combineFileName) {
				
				var interval = (parseFloat(this.compareParams.max) - parseFloat(this.compareParams.min)) / 10;
				var legend = [];
				for (var i = 1; i < 11; i++) {
					legend[i-1] = (parseFloat(this.compareParams.min) + interval * i).toExponential(2);
				}

				this.legend = legend;
				this.showLgv = true;
			}
            
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
	        	// console.log(JSON.stringify(this.timeSeriesSeries));
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