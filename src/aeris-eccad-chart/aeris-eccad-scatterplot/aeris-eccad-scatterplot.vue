<template>
  <div>
    <!--div class="mapTitle">{{ scatterplotTitle }}</div-->
    <div id="scatterplot"></div>
  </div> 
</template>

<script>

import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';

export default {
  props: {
  },
  
  data () {
    return {
      scatterPlotTitle: '',
      file : {},
      file2 : {},
      sector : {},
      sector2 : {},
      parameter : {},
      parameter2 : {},
      unit : {},
      unit2 : {},
      dataset: {},
      dataset2: {},
      mask: false,
      beginDateIndex: 0,
      beginDateIndex2: 0,
      geospatial: {},
      latMinR: 0,
      latMaxR: 0,
      lonMinR: 0,
      lonMaxR: 0,
      geospatial2: {},
      total: false,
      region: {},
      lr: {},
      tempParams: {}
    }
  },
  
  watch: {
     file (value) {
        this.drawChart();
     },
     file2 (value) {
        this.drawChart();
     }
  },
  
  computed: {  
  },
  
  mounted: function () {
  },
    
  destroyed: function() {
  },
  
  created: function () {
   console.log("Aeris Eccad Scatterplot - Creating");  
    EventBus.$on('mask', data => {
	  this.region = JSON.parse(data);
	});
    EventBus.$on('dataset', data => {
	  this.dataset = JSON.parse(data);
	});
	EventBus.$on('sector', data => {
	  this.sector = JSON.parse(data);
	});
	EventBus.$on('file', data => {
	  this.file = JSON.parse(data);
	});
    EventBus.$on('parameter', data => {
	  this.parameter = JSON.parse(data);
	});
    EventBus.$on('unit', data => {
	  this.unit = JSON.parse(data);
	});
    EventBus.$on('geospatial', data => {
	  this.geospatial = JSON.parse(data);
	});
    EventBus.$on('dataset2', data => {
	  this.dataset2 = JSON.parse(data);
	});
	EventBus.$on('sector2', data => {
	  this.sector2 = JSON.parse(data);
	});
	EventBus.$on('file2', data => {
	  this.file2 = JSON.parse(data);
	});
    EventBus.$on('geospatial2', data => {
	  this.geospatial2 = JSON.parse(data);
	});
    EventBus.$on('parameter2', data => {
	  this.parameter2 = JSON.parse(data);
	});
    EventBus.$on('unit2', data => {
	  this.unit2 = JSON.parse(data);
	});
    EventBus.$on('latMinR', data => {
	  console.log("latminr: " + latminr)
      this.latMinR = JSON.parse(data);
	});
    EventBus.$on('latMaxR', data => {
      this.latMaxR = JSON.parse(data);
	});
    EventBus.$on('lonMinR', data => {
      this.lonMinR = JSON.parse(data);
	});
    EventBus.$on('lonMaxR', data => {
      this.lonMaxR = JSON.parse(data);
	});
        
    // events to do: latMin/latMax/lonMin/lonMax/beginDateIndex/beginDateIndex2/isTotal/region
  },
   
  methods: {
    drawChart: function() {
           
            	/* var params = {
            	"filename1" : file.name,
            	"filename2": file2.name, 
            	"sector1": sector.variable,
            	"sector2": sector2.variable,
            	"gbl1": dataset.global,
            	"gbl2": dataset.global,
            	//CHANGE!!!!!
            	"mask": false,
            	"date1": beginDateIndex,
            	"date2": beginDate2Index,
            	"latMin1": geospatial.latminGeospatial,
            	"latMax1": geospatial.latmaxGeospatial,
            	"lonMin1": geospatial.lonminGeospatial,
            	"lonMax1": geospatial.lonmaxGeospatial,
            	"latMinR": latMinR,
            	"latMaxR": latMaxR,
            	"lonMinR": lonMinR,
            	"lonMaxR": lonMaxR,
            	"latMin2": geospatial2.latminGeospatial,
            	"latMax2": geospatial2.latmaxGeospatial,
            	"lonMin2": geospatial2.lonminGeospatial,
            	"lonMax2": geospatial2.lonmaxGeospatial,
            	"total": isTotal,
            	"numregion":region.orderLegend
            	} */
                
                	var params = {
            	"filename1" : file.name,
            	"filename2": file2.name, 
            	"sector1": sector.variable,
            	"sector2": sector2.variable,
            	"gbl1": dataset.global,
            	"gbl2": dataset.global,
            	//CHANGE!!!!!
            	"mask": false,
            	"date1": beginDateIndex,
            	"date2": beginDate2Index,
            	"latMin1": geospatial.latminGeospatial,
            	"latMax1": geospatial.latmaxGeospatial,
            	"lonMin1": geospatial.lonminGeospatial,
            	"lonMax1": geospatial.lonmaxGeospatial,
            	"latMinR": latMinR,
            	"latMaxR": latMaxR,
            	"lonMinR": lonMinR,
            	"lonMaxR": lonMaxR,
            	"latMin2": geospatial.latminGeospatial,
            	"latMax2": geospatial.latmaxGeospatial,
            	"lonMin2": geospatial.lonminGeospatial,
            	"lonMax2": geospatial.lonmaxGeospatial,
            	"total": total,
            	"numregion":0
            	} 
            	
                console.log("scatterplot params: " + JSON.stringify(params));
                
            	if(params.filename1 != this.tempParams.filename1 || params.filename2 != this.tempParams.filename2 || params.sector1 != this.tempParams.sector1 || params.sector2 != this.tempParams.sector2 ) {
            
            	this.tempParams.filename1 = params.filename1;
            	this.tempParams.filename2 = params.filename2;
            	this.tempParams.sector1 = params.sector1;
            	this.tempParams.sector2 = params.sector2;
            	
            	
           	 var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
           	 var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
           	 
            var height = h - 200;
           	 
           	 var colors = ["rgb(0, 0, 140)","rgb(0, 0, 255)", "rgb(0, 105, 255)","rgb(0, 219, 255)", "rgb(66, 255, 181)","rgb(181, 255, 66)","rgb(255, 215, 06)","rgb(255, 101, 0)", "rgb(247, 0, 0)", "rgb(140, 0, 0)"];
             	
            	this.$http.get(this.eccadConfig.api + "dataanalysis/scatterplot", {"params" : params}) 
                 .then(function(result){
                    
                	 var data = [];
                	 for(var i = 0; i < result.data.scale.length; i++) {
                		 data.push({
                            "name" : result.data.scale[i], 
                            "color": colors[i], 
                            "data": []});	
                	 }

                    lr = {};
                    var n = result.data.list.length;
                    var sum_x = 0;
                    var sum_y = 0;
                    var sum_xy = 0;
                    var sum_xx = 0;
                    var sum_yy = 0;
                	 
                	for(var i = 0; i < result.data.list.length; i++) {

                        sum_x += result.data.list[i].value1 * result.data.list[i].numberOfPoints;
                        sum_y += result.data.list[i].value2 * result.data.list[i].numberOfPoints;
                        sum_xy += (result.data.list[i].value1 * result.data.list[i].value2 * result.data.list[i].numberOfPoints);
                        sum_xx += (result.data.list[i].value1 * result.data.list[i].value1 * result.data.list[i].numberOfPoints);
                        sum_yy += (result.data.list[i].value2 * result.data.list[i].value2 * result.data.list[i].numberOfPoints);

                        data[result.data.list[i].colorId].data.push([result.data.list[i].value1 , result.data.list[i].value2]);
                	 }
                       
                    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
                    lr['intercept'] = (sum_y - $scope.lr.slope * sum_x)/n;
                    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
                    // data.push({"name": "regression line", "color" : colors[9], "data": [$scope.lr['intercept'],0], });
                        
                    var xAxisTitle = this.parameter.displayName + " " + this.unit;
                    var yAxisTitle = this.parameter2.displayName + " " + this.unit2;
                    
                    new Highcharts.Chart('scatterplot', {
                             chart: {
                                 type: 'scatter',
                                 width: (width  - 200),
                                 height: height,
                                 zoomType: 'xy'
                             },
                             colors: colors,
                             title: {
                                 text: ''
                             },
         
                             subtitle: {
                                 text: ''
                             },
                             credits: {
                                 enabled: false
                             },
                             xAxis: {
                                title: {
                                    text : xAxisTitle
                                },
                                labels: {
                                    formatter: function() {
                                        return this.value.toExponential(2); // 2 digits of precision
                                    }
                                }
                             },
                             yAxis: {
                                title: {
                                    text : yAxisTitle
                                },
                                labels: {
                                    formatter: function() {
                                        return this.value.toExponential(2); // 2 digits of precision
                                    }
                                }
                             },
                             plotOptions: {
                                 scatter: {
                                     marker: {
                                         radius: 3,
                                         symbol: "circle",
                                         states: {
                                             hover: {
                                                 enabled: true,
                                                 lineColor: 'rgb(100,100,100)'
                                             }
                                         }
                                     },
                                     states: {
                                         hover: {
                                             marker: {
                                                 enabled: false
                                             }
                                         }
                                     }
//                                     tooltip: {
//                                    	 
//                                    	 formatter: function() {
//                                             return '<b>' + this.parameter.displayName + ": "+ this.x.toExponential(2) +'</b><br/>'+
//                                                 '<b>'+ this.parameter2.displayName + ": " + this.y.toExponential(2) + '<b>';
//                                         }
                                    	 
                                         // headerFormat: '<b>{series.name}</b><br>',
                                         // pointFormat: '{point.x.toExponential(2)} ' + this.parameter.displayName + ' / {point.y.toExponential(2)} ' + $rootScope.parameter2.displayName
//                                     }
                                 }
                             },
                             tooltip: {	 
                            	 formatter: function() {
                                     return '<b>' + this.parameter.displayName + ": "+ this.x.toExponential(2) +'</b><br/>'+
                                         '<b>'+ this.parameter2.displayName + ": " + this.y.toExponential(2) + '<b>';
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
                             series: data  
                         });
                                          
                 });
            }	
            	         	
        }
    }  
}
</script>

<style>
</style>