/*
 dependances: 
*/


<template>
  <span>
	  <div class="alert alert-warning" v-show="!showDownload">No selection</div> 
    <div class="mapTitleHeader" v-show="showDownload">{{inventory.titre}} {{resolution.fullNameResolution}} {{datatype.shortName}} {{parameter.shortName}} {{scenario.displayNameScenario}} - {{mapParams.time}}</div> 
    <div class="downloadFlex" v-show="showDownload">
        <div>
            <div class="downloadLeft field">Output file(s)</div>
            <div class="downloadBox downloadLeft">
                <div>
                    <label class="spacedradiobutton">      
                        <input type="radio" name="filesPerYear" value="selected" v-model="nbFiles" />1 file per selected year
                    </label>
                </div>
                <div>
                    <label class="spacedradiobutton">        
                        <input type="radio" name="filesPerYear" value="all" v-model="nbFiles" />1 file covering whole time period
                    </label>
                </div>
            </div>
        </div>
        <div>
            <div class="downloadRight field">Files</div>
            <div class="downloadBox downloadRight">
                <div><span class="field">Format</span>&nbsp;<b>NetCDF 4-Classic</b></div>
                <div><span class="field">Size</span>&nbsp;<b>{{file.size}}</b></div>
            </diV>
        </div>
    </div>
    <br>
    <div v-show="showDownload" class="downloadMargin">
        <input type="checkbox" v-model="agree" /><span class="field">I agree with the following Data Policy</span>
    </div>
    <br>
    <div class="downloadBox downloadMargin" v-show="showDownload">
        <p><b>Before downloading data set from this database, we request that each user consult the relevant detailed information, which indicates the specific rights applicable to that particular data set. When using or displaying the dataset, the user is requested to indicate the corresponding citation:</b></p>
    
        <p>{{metadata.authors}} {{metadata.publication}}</p>

        <p><b>When clicking on the Download button, you agree with the specific product user constraints:</b></p>

        <p>The User shall take all relevant steps to maintain the rights of the various Licensors including those of the CNRS-INSU and CNES. In particular, he shall clearly mark on all communications and distributed documents, the name and identification of the various Licensors, whose list is provided in the metadata files, and refer to the ECCAD-Ether project as the service provider. The manner how each product has to be referenced is explicitly written in the metadata file of the ECCAD-Ether product. It's expressly agreed that the User shall refrain from any commercial use whatsoever, direct or indirect, of products provided by ECCAD-Ether.</p>

        <p><b>And publication information:</b></p>

        <p>Users of the ECCAD products are required to acknowledge ECCAD in all communications and publications for the archiving and distribution of the data, and to quote the reference(s) indicated in CITATION.</p>

    </div>

    <div class="buttonCenter" v-show="showDownload">
    	<a data-toggle="tooltip" title="select one file per year or all years and agree to the data policy"><input type="button" class="btn btn-default buttonDisabled" value="Download" v-show="!agreePolicy"></input></a>
    	<input type="button" class="btn btn-default" value="Download" @click="download()" v-show="agreePolicy"></input>
    </div>
  </span>  
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
      metadata: {},
      inventory: {},
      resolution: {},
      datatype: {},
      parameter: {},
      scenario: {},
      mapParams: {},
      file: {},
      size: '',
      showDownload: false,
      agree: true,
      agreePolicy: true,
      nbFiles: 'all', 
      isTotal: false,
      beginDateIndex: 0,
      endDateIndex: 0,
      eccadConfig: {
        api: 'http://eccad.aeris-data.fr/eccad2web/rest/'
      }

    }
  },
  
  watch: {
    file (value) {
      this.refresh();
    },
    agree (value) {
      console.log("agree changed: " + value)
      this.agreePolicy = value;
    }
  },
  
  mounted: function () {
    this.refresh();
  },
  
  updated: function() {
  },
  
  destroyed: function() { 
  },
  
  created: function () {
    console.log("Aeris Eccad Download - Creating");
    EventBus.$on('datatype', data => {
		  this.datatype = JSON.parse(data);
    }); 
    EventBus.$on('dataset', data => {
		  this.inventory = JSON.parse(data);
    }); 
    EventBus.$on('resolution', data => {
		  this.resolution = JSON.parse(data);
    }); 
    EventBus.$on('parameter', data => {
		  this.parameter = JSON.parse(data);
    });    
    EventBus.$on('sector', data => {
		  this.sector = JSON.parse(data);
    });
    EventBus.$on('scenario', data => {
		  this.scenario = JSON.parse(data);
    });  
    EventBus.$on('beginDate', data => {
		  this.beginDate = JSON.parse(data);
    }); 
    EventBus.$on('file', data => {
		  this.file = JSON.parse(data)[0];
    }); 
    EventBus.$on('mapParams', data => {
		  this.mapParams = JSON.parse(data);
    }); 
    EventBus.$on('beginDateIndex', data => {
		  this.beginDateIndex = JSON.parse(data);
    }); 
    EventBus.$on('endDateIndex', data => {
		  this.endDateIndex = JSON.parse(data);
    }); 

  },
  
  computed: {
  },
  
  methods: {
  
    refresh: function() {
      if(this.file && this.file.size && this.file.size.length > 0) {
        this.showDownload = true;
      }
      else {
        this.showDownload = false;
      }
    },

    download: function() {
      if(this.file.name.length > 0) {
        if(this.file.total === 'total') {
          this.isTotal = true;
        }
        else {
          this.isTotal = false;
        }

        if(this.nbFiles === 'all') {
          var url = this.eccadConfig.api + "download/fileperperiod?name=" + this.file.name + "&total=" + this.isTotal + "&oneFileYear=true"   		
          var win = window.open(url, '_blank');
          win.focus();  
        }
        else {
          // TODO
        }
           
      }
    }
  }
}
</script>

<style>	
</style>