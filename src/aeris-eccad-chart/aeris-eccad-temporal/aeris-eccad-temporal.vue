/*
 dependances: 
*/

<template>
  <div>
    <br />
    <div id="temporalChart"></div>
  </div>
</template>

<script>
export default {
  props: {
  },
  
  data () {
    return {       
        colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
        invCats: [],
        temporalLegends: [],
        temporalSeries: [],
        showTemporal: false
    }
  },
  
  watch: {    
  },
  
  mounted: function () {
  },
  
  updated: function() {
  },
  
  destroyed: function() {
    document.removeEventListener('invCats', this.setInvCats);
  },
  
  created: function () {
    console.log("Aeris Eccad Temporalchart - Creating");
    document.addEventListener('invCats', this.setInvCats);
  },
  
  computed: {
  },
  
  methods: {
    
    setInvCats: function(evt) {
      this.invCats = evt.detail;
      this.getSeriesAndLegends();
    },
    getSeriesAndLegends: function() {
        if(this.invCats.length > 1) {             
            // this.temporalSeries = [];
            // this.temporalLegends = [];
            var auxSeries = [];
            var auxLegends = [];
            this.invCats.forEach( function(i) {
                
                var temps = i.temporalCoverage[0];
                var begin = parseInt(temps.substring(0,4));
                var end = parseInt(temps.substring(5));
                if(begin == 1) {
                    begin = end;
                }
                if(end == 1) {
                    end = begin;
                }
                // var aux = [{low :begin , high: end}];
                // auxSeries.push({name: i.name, data :aux});
                
                var aux = {low :begin , high: end};
                auxSeries.push(aux);
                 
                auxLegends.push(i.name);
            });
            this.temporalSeries = [{type: 'columnrange', data: auxSeries}];
            this.temporalLegends = auxLegends;
            this.drawGraph();
            this.showTemporal = true; 
        }
    },

    drawGraph: function() {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h = 14 * this.invCats.length;
            
            new Highcharts.Chart('temporalChart', {
                chart: {
                    type: 'columnrange',
                    inverted: true,
                    width: w - 100,
                    height: h,
                    // marginLeft: 25,
                    // marginRight: 25,
                },
                colors: this.colors,
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                xAxis: {
                    categories: this.temporalLegends,
                    opposite: true
                },

                yAxis: {
                    title: {
                        text: 'Time'
                    }
                },

                plotOptions: {
                    columnrange: {
                        series: {
                            pointWidth: 20
                        },
                        // pointWidth: 20,
                        dataLabels: {
                          enabled: true,
                          formatter: function () {
                                return this.y;
                            }
                        }
                    }
                },

                legend: {
                    enabled: false
                },

                credits: {
                    enabled: false
                },

                series: this.temporalSeries
            });
        }
     
   
  }  
}
</script>

<style>
</style>