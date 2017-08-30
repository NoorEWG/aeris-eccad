/*
 dependances: 
*/

<template>
  <div>
    <div class="etTitle">{{ title }}</div>                
    <div class="chartTS1">
      <div :id="identifier" class="chartTS"></div>
    </div>
  </div> 
</template>

<script>
import { EventBus } from '../../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
      identifier: {type: String},
      minmaxtotal: {type: Number},
  },
  
  data () {
    return {       
      colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
      showGraph: false,        
      itInventory: {},
      itCategory: {},
      itUnit: {},
      title: '',
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
    console.log("Aeris Eccad Emission Time Series Chart - Creating");
    EventBus.$on('itDataset', data => {
        this.itInventory = JSON.parse(data);
    });
    EventBus.$on('itCategory', data => {
        this.itCategory = JSON.parse(data);
    });
    EventBus.$on('unit', data => {
        this.itUnit = JSON.parse(data);
    });
    EventBus.$on('showITS', data => {
        this.showGraph = true;
        this.showTimeSeries();
    });
    
  },
  
  computed: {
  },
  
  methods: {

  showTimeSeries:  function() {
    // get data from the server parse it to a graph
    var url = 'http://eccad.aeris-data.fr/eccad2web/rest/dataset/inventoryParameterTimeSeries';
    var params = {
      inventoryid: this.itInventory.id,
      categoryid: this.itCategory.id
    }
    this.$http({url: url, method: 'GET', params: params})
    .then(function (result) {

    // 1 = min, 2 = max, 3 = total  
    var series = [];
    var chartTitle = '';

        // get the Name of the inventory (key values)
        var inventoryNames = [];
        for(var i in result.data) {
            inventoryNames.push(i);
        }  
        
        for(var i = 0; i < inventoryNames.length ; i++) {
            
            var grids = result.data[inventoryNames[i]];
            var values = [];
    
            for(var j = 0; j <  grids.length ; j ++) {
                var year = parseInt(grids[j].dateString.substring(0,4));
                var aux = [];
                aux[0] = year;

                if(this.minmaxtotal === 1) {
                    aux[1] = grids[j].minGrid;
                    chartTitle = 'Min';
                }
                if(this.minmaxtotal === 2) {
                    aux[1] = grids[j].maxGrid;
                    chartTitle = 'Max'
                }
                if(this.minmaxtotal === 3) {
                    aux[1] = grids[j].sumGrid;
                    chartTitle = 'Total'
                }
                values.push(aux);
            }
            series.push({name: inventoryNames[i], data: values, type: "spline"});
        }
        this.series = series;
        this.title = chartTitle + ' ' + this.firstUpper(this.itCategory.fullName) + " - "+ this.itInventory.titre;  
        this.drawChart(this.identifier, "spline", this.series);
        this.showGraph = true;
        EventBus.$emit('showITSGraph', JSON.stringify(this.showGraph));
 
    }); 
  },

  firstUpper: function(str) {
    var tmp = str.split(" ");
    var aux = [];
    tmp.forEach( function(s) {
      aux.push(s.charAt(0).toUpperCase() + s.slice(1));
    });
    return aux.join(" ");
  },

  drawChart: function(id, type, series) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;            
       
    var unitName = '';
    if(this.unit && this.unit.totalName) {
        unitName = this.unit.totalName;
    }   

    new Highcharts.Chart(id, {
        chart: {
            type: type,
            width: (w - 200),
            // height: h,
            zoomType: 'xy'
        },
        // colors: colors,
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
        yAxis: { 
                title: {
                    text: unitName,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    style: {
                        fontSize:'14px',
                        fontWeight: 'bold'
                    }
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
        series: series
    });
  }

}
}
</script>

<style>
</style>