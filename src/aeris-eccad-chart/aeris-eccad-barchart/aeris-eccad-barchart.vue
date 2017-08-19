/*
 dependances: 
*/


<template>
    <!--div class="timeSeriesChart" v-if="!resetGraph"-->
	<div class="timeSeriesChart">
           <div id="chartTS1" class="chartTS1">
                <div id="chart1" class="chartTS"></div>
           </div>
      </div>
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
    service: {
      type: String,
      default: ''
    },
    chartType: {
      type: String,
      default: 'areaspline'
    },
    first: {
      type: Boolean,
      default: true
    }
  },
  
  data () {
    return {
        barchartService: this.service,
        sector: {type: Object},
        scenario: {type: Object},
        cType: this.chartType,
        premier: this.first,
        dataset: {type: Object},
        series: {type: Array},
        unit: {type: Object},
        file: {type: Object},
        sectorname: {type: String}
    }
  },
  
  watch: {
    service (value) {
	      this.barchartService = value
	      this.refresh();
    },
    file (value) {
    	this.refresh();
    },
    sector (value) {
    	this.refresh();
    },
    
    
  },
  
  mounted: function () {
   // this.refresh(); 
  },
  
  updated: function() {
    
  },
  
  destroyed: function() {
  },
  
  created: function () {
    console.log("Aeris Eccad Barchart - Creating");
     
     if(this.premier) {
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
	} 
	else {
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
	}
    this.refresh();
    
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
  
  	   // console.log("barchart, in refresh");
  	   // console.log("sectorname: " + JSON.stringify(this.sectorname));
  	   // console.log("barchartService: " + JSON.stringify(this.barchartService));
  	   // console.log("cType: " + JSON.stringify(this.cType));
  	   // console.log("file: " + JSON.stringify(this.file));
  	   // console.log("filename: " + JSON.stringify(this.file[0].name));
  	   if (this.barchartService && this.sectorname && this.cType && this.file && this.file[0].name) {
  	   	   // console.log ("not all null");		    
  	       var fileName = this.file[0].name;
  	       console.log(fileName);   
  	       var url = this.barchartService  + "?filename=" + fileName + "&sector=" + this.sectorname + "&type=" + this.cType;
	   	   this.$http.get(url).then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)}); 	   																																																																																																																																																																																																											}
   },
      
  handleSuccess : function(response) {

        console.log(JSON.stringify(response.data));
         
        var type = this.cType;
        var inventory = this.dataset;
        var sector = this.sector;
    
        var categories = response.data.legend.splice(1, response.data.legend.length); 
        var categories2 = [];
        for(i = 0; i < categories.length ; i++) {
            categories2.push(parseInt(categories[i].substring(0,4)));
        }

        if(this.premier) {
            this.graphData =[{
                inventoryId : inventory.id,    
                inventoryName: inventory.titre,
                sector: sector, 
                categories: categories2,
                data : response.data
            }];
           EventBus.$emit('graphData', this.graphData);	 
        }     
        else {
           // remove all other graphData, except the selected first inventory 
           if(this.graphData.length > 1) {
                  this.graphData.splice(1,this.graphData.length); 
           } 
         
           this.graphData.push({
                inventoryId : inventory.id,    
                inventoryName: inventory.titre,
                sector: sector, 
                categories: categories2,
                data : response.data
            }); 
        }
                
        
        var seriesData = [];
        for(var i = 0 ; i < response.data.series[0].length; i++) {
                seriesData.push([parseInt(categories[i].substring(0,4)), response.data.series[0][i]]);
        }
        
        var colorIndex = 0;
        if(this.series.length > 0) {
        var colorIndex = this.series.length % 20;
        }
    
        var series = {
                yAxis: 0,
                name: inventory.titre + " " + sector.name,
                fillOpacity: 0.5,
                type: type,
                data: seriesData,
                id: sector.id +  sector.variable + inventory.id + 0,
                colorIndex : colorIndex
            };
    
        if(this.premier) {
            this.series = [series];
        }
        else {
            this.series.push(series);
        }
        
        // $rootScope.resetGraph1 = false;    
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#ffbb78", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#aec7e8", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
            
            if(this.series && this.series.length > 0) {
                if(this.series.length > 1) {
                    for(var i = 0; i < this.series.length; i++) {
                        this.series[i].colorIndex = i % 20;
                    }
                }

                // sort the series alphabetically
                function compareLegend(a,b) {
                    if (a.name < b.name) {
                        return -1;
                    }    
                    if (a.name > b.name) {
                        return 1;
                    }    
                    return 0;
                }

                this.series.sort(compareLegend);
                var yAxis = [];
                /* if($rootScope.dataAnalysisRegions && $rootScope.dataAnalysisRegions.length > 0) {
                yAxis = [{title: {
                                text: '$rootScope.totalUnit',
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                    }
                                }
                            },
                            {title: {
                                text: '$rootScope.totalUnit' + " - regions",
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                    }
                                },
                                opposite: true,
                              
                            }];
               }       
                else { */
                    yAxis = [{title: {
                                text: this.unit.total,
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                    }
                                }
                            }];
                // }     

//                if(document.getElementById("chartTS1") != null && document.getElementById("chart1") != null) {
//                	$scope.chartWidth = document.getElementById("chartTS1").getBoundingClientRect().width;
//                }
//                else {
//                	$scope.chartWidth = window.innerHtml * 0.4;
//                }
                 
                var chart1 = new Highcharts.Chart('chart1', {
                    chart: {
                        type: 'column',
                        // width: chartWidth,
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
                    series: this.series  
                });
                }
            }
  },
        
  
  handleError: function(response) {
  		console.log("Aeris-Eccad-BarChart - Error while accessing server:"); 
        var error = response.status;
        var message = response.statusText;
        if(!error) message = 'Can\'t connect to the server';
        console.log('Error ' + error + ': ' + message);
 },
 
 createGraphData: function(data, premier) {
        

    },
 
 
  
}
</script>

<style>

.aeris-eccad-sector-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    display: inline-block;
}
.aeris-eccad-sector-list {
    width: 140px;
    display: inline-block;
}
	
</style>