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
export default {
  props: {
      identifier: {type: String},
      minmaxtotal: {type: Number},
  },
  
  data () {
    return {       
      colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
      showGraph: false,        
      etParameter: {},
      etCategory: {},
      etUnit: {},
      title: '',
      isGlobal: true
    }
  },
  
  watch: {    
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('etParameter', this.setParameter);
    document.removeEventListener('etCategory', this.setCategory);
    document.removeEventListener('etGlobal', this.setGlobal);
    document.removeEventListener('unit', this.setUnit);
    document.removeEventListener('showETS', this.setShowETS);
  },
  
  created: function () {
    console.log("Aeris Eccad Emission Time Series Chart - Creating");
    document.addEventListener('etParameter', this.setParameter);
    document.addEventListener('etCategory', this.setCategory);
    document.addEventListener('etGlobal', this.setGlobal);
    document.addEventListener('unit', this.setUnit);
    document.addEventListener('showETS', this.setShowETS);

  },
  
  computed: {
  },
  
  methods: {

      setParameter: function(evt) {
          this.etParameter = evt.detail;
      },

      setCategory: function(evt) {
          this.etCategory = evt.detail;
      },

      setGlobal: function(evt) {
          this.etGlobal = evt.detail;
      },

      setUnit: function(evt) {
          this.etUnit = evt.detail;
      },

      setShowETS: function(evt) {
          this.showGraph = true;
          this.showTimeSeries();
      },

  showTimeSeries:  function() {
    // get data from the server
    // parse it to a graph
    let url = 'http://eccad.aeris-data.fr/eccad2web/rest/dataset/emissionTimeSeries/' + this.etParameter.id + '/' + this.etCategory.id + '/' + this.isGlobal + '/' + 'sabine.daras@obs-mip.fr';
    this.$http.get(url)
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
        this.title = chartTitle + ' ' + this.firstUpper(this.etCategory.fullName) + " - "+ this.etParameter.shortName; 
        this.drawChart(this.identifier, "spline", this.series);
        this.showGraph = true;
        var ev1 = new CustomEvent('showETSGraph', { 'detail': this.showGraph });
        document.dispatchEvent(ev1); 
     
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