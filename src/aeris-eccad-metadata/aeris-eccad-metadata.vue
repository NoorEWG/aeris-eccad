/*
 dependances: 
*/


<template>
<div>
    <div class="metadataButtons">
        <!--div v-show="rcpScenarios.length > 0">
            <div type="button" class="btn btn-default" v-bind="scenario" @click="loadMetadata('RCP',$index)" v-for="scen in rcpScenarios">{{scen.name}}</div>
        </div>
        
        <div v-show="maccityInvs.length > 0">
            <div type="button" class="btn btn-default" v-bind="scenario" @click="loadMetadata('MACC',$index)" v-for="inv in maccityInvs">{{inv.name}}</div>
        </div-->
        <div v-show="rcpScenarios.length < 1 && maccityInvs.length < 1">&nbsp;</div>
        <div>
            <div type="button" class="btn btn-default" @click="downloadPdf()">Export &nbsp;<span class="fa fa-download"></span></div>
        </div>
    </div>
    <div class="metadata" ref="metadata">

        <div class="metadataHeader">General Information</div>

        <div class="metadataL">Dataset name</div>
        <div class="metadataR metaTitle">{{meta.title}}</div>
        
        <div class="metadataL">Title</div>
        <div class="metadataR">{{meta.longTitle}}</div>

        <div class="metadataL">Spatial coverage</div>
        <div class="metadataR">{{spatialCoverage}}</div>

        <div class="metadataL">Spatial resolution</div>
        <div class="metadataR">{{resolutions}}</span></div>

        <div class="metadataL">Temporal coverage</div>
        <div class="metadataR">{{meta.temporalCover}}</div>

        <div class="metadataL">Parameters</div>
        <div class="metadataR">
            <div class="metadataFlex">             
                <div v-for="cat in meta.categories" :class="(meta.categories.length == 1 || meta.categories.length == 2) ? 'metadataList50' : (meta.categories.length == 3) ? 'metadataList30' : 'metadataList20'">
                    <div>
                        <a class="metadataLink" @click="hideShowSpecies(cat.paramref)" :style="{color : cat.color}"  data-toggle="tooltip" title="click to get more information">{{cat.name}} - {{cat.parametresDTO.length}} parameters</a>
                        <div :id="cat.paramref" :ref="cat.paramref" class="hideMetadataList">
                            <div v-for="p in cat.parametresDTO">
                                <div>{{p.fullname}}</div>
                            </div>
                        </div>
                    </div>    
                </div>
           </div>
           <div class="metadataFlex">
                <div v-for="c in meta.categories" :class="(meta.categories.length == 1 || meta.categories.length == 2) ? 'metadataList50' : (meta.categories.length == 3) ? 'metadataList30' : 'metadataList20'">      
                   <div>
                        <a class="metadataLink" @click="hideShowSectors(c.sectorref)" :style="{color : c.color}"  data-toggle="tooltip" title="click to get more information">{{c.name}} - {{c.sectorsDTO.length}} sectors</a>
                        <div :id="c.sectorref" :ref="c.sectorref" class="hideMetadataList">
                            <div v-for="s in c.sectorsDTO">
                                <div>{{s.nameSector}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="metadataL">Institute</div>
        <div class="metadataR">{{ institute }}</div>
  
        <div class="metadataL">Contacts</div>
        <div class="metadataR">{{contacts}}</div>

        <div class="metadataHeader">Abstract</div>

        <div class="metadataL">&nbsp;</div>
        <div class="metadataR">{{meta.abstractField}}</div>

        <div class="metadataHeader">Methodology</div>

        <div class="metadataL">&nbsp;</div>
        <div class="metadataR">{{meta.methodology}}</div>

        <div class="metadataHeader">Reference and citation</div>

        <div class="metadataL">ECCAD reference</div>
        <div class="metadataR"><a :href="meta.redirect" >http://www.aeris-data.fr/redirect/{{meta.title}}</a></div>
        <!--  in application: base-url + catalog/metadata?name={{meta.title}} --> 
        <div class="metadataL">ECCAD citation</div>
        <div class="metadataR">Users of the ECCAD products are required to acknowledge ECCAD in all communications and publications for the archiving and distribution of the data, and to quote the reference(s) indicated in CITATION.</div>

        <div class="metadataL">Dataset citation</div>
        <div class="metadataR">{{meta.autors}}&nbsp;<a :href="meta.urlPublication" target="_blank">{{meta.titlePublication}}</a>&nbsp;<b>{{meta.journalPublication}}</b>&nbsp;   {{publication}}</div>   

        <div class="metadataL">Dataset DOI</div>
        <div class="metadataR">{{meta.doi}}</div>

        <div class="metadataHeader">Original data site</div>

        <div class="metadataL">Data URL</div>
        <div class="metadataR"><a :href="meta.urlData" target="_blank">{{meta.urlData}}</a></div>

        <div class="metadataL">Documentation</div>
        <div class="metadataR"><a :href="meta.urlDoc" target="_blank">{{meta.urlDoc}}</a></div>

        <div class="metadataL">History</div>
        <div class="metadataR">{{meta.history}}</div>

        <div class="metadataL">Source</div>
        <div class="metadataR">{{source}}</div>

        <div class="metadataL">Version</div>
        <div class="metadataR">{{meta.version}}</div>

        <div class="metadataHeader">User constraints</div>
        
        <div class="metadataL"></div>
        <div class="metadataR">{{meta.useconstraint}}</div>

    </div>

</div>
	
</template>

<script>
import { EventBus } from '../aeris-event-bus/aeris-event-bus.js';
export default {
  props: {
  },
  
  data () {
    return {
      inv: {},
      inventoryName: '',
      rcpScenarios: [],
      maccityInvs: [],
      contacts: [],
      resolutions: [],
      meta: {},
      institute: '',
      publication: '',
      spatialCoverage: '',
      source: '',
      eccadConfig: {
        api: 'http://eccad.aeris-data.fr/eccad2web/rest/'
      }
    }
  },
  
  watch: {
    inv (value) {
      this.refresh();
    }
  },
  
  mounted: function () {
  },
  
   updated: function() {
  },
  
  destroyed: function() { 
  },
  
  created: function () {
    console.log("Aeris Eccad Metadata - Creating");
    EventBus.$on('metadata', data => {
      this.inv = JSON.parse(data);
	});
  },
  
  computed: {
  },
  
  methods: {
  
  refresh: function() {
    if(this.inv && this.inv.name) {
      this.inventoryName = this.inv.name;
      if (this.inv.name.includes("RCP")) {
        this.rcpScenarios = [{name: "RCP45"},{name: "RCP60"}, {name: "RCP85"},  {name: "RCP3PD"}];
        this.inventoryName = "RCP45";
      } 
      else {
        this.rcpScenarios = [];
      } 
      if(this.inv.name.includes("MACC")) {
        this.maccityInvs = [{name: "MACCity-anthro"},{name: "MACCity-bb"}];
        this.inventoryName = "MACCity-anthro";
      }
      else {
        this.maccityInvs = [];
      }         
      this.getMetadata(this.inventoryName);
    }
  },

  /*$scope.loadMetadata = function (name, index) {
            	if(name == "RCP") {
            		getMetadata($scope.rcpScenarios[index].name);
            	}
            	if(name == "MACC") {
            		getMetadata($scope.maccityInvs[index].name);
            	}
            }*/

    hideShowSpecies: function (chosenRef) {  
       
        if (document.getElementById(chosenRef).className === 'hideMetadataList') {
            document.getElementById(chosenRef).removeAttribute('hideMetadataList');
            document.getElementById(chosenRef).setAttribute('class', 'showMetadataList');
        }
        else {
            document.getElementById(chosenRef).removeAttribute('showMetadataList');
            document.getElementById(chosenRef).setAttribute('class', 'hideMetadataList');
        }
    },

    hideShowSectors: function (chosenRef) {
        if (document.getElementById(chosenRef).className === 'hideMetadataList') {
            document.getElementById(chosenRef).removeAttribute('hideMetadataList');
            document.getElementById(chosenRef).setAttribute('class', 'showMetadataList');
        }
        else {
            document.getElementById(chosenRef).removeAttribute('showMetadataList');
            document.getElementById(chosenRef).setAttribute('class', 'hideMetadataList');
        }
    },
            
           

  getMetadata: function(inventoryName) {
    this.$http.get(this.eccadConfig.api + "dataset/inventory?title=" + inventoryName)
        .then(function (result) {
            var datasetId = result.data.id; 

           /* $http.get(eccadConfig.api + "data/scenarios/" + datasetId)
            .then(function (result) {
                    // = result.data[0];
            }); */       

            
            this.$http.get(this.eccadConfig.api + "dataset/metadata/" + datasetId)
            .then(function (result) {
                    var meta = result.data[0];
                    meta.redirect = 'http://www.aeris-data.fr/redirect/' + meta.title;
                    //TODO !!!!!
                    this.source = "";
                    
                    var count = 0;

                    meta.categories.forEach( function(c) {
                       c.sectorref = "sector" + count;
                       c.paramref = "param" + count;
                       count++;
                    });  

                    var contactsAux = [];
                    if(meta.contacts) {
                        meta.contacts.forEach(function (m) {
                        var contact = m.firstName + " " + m.lastName + " (" + m.mail + ")";
                        contactsAux.push(contact);
                        }); 
                        this.contacts = contactsAux.join(" - ");
                        this.institute = meta.contacts[0].organization.fullname + ' - ' + meta.contacts[0].organization.city + ' - ' + meta.contacts[0].organization.state;

                    }
                    else {
                        this.contacts = [];
                        this.institute = '';
                    }
                
                    
                    

                    this.spatialCoverage = meta.geospacial.join(" - "); 
                    this.resolutions = meta.gridResolutions.join(" - ");
                    
                    var year = "";
                    if (meta.yearPublication != "") {
                        year = meta.yearPublication;
                    }
                    var volume = "";
                    if (meta.volumePublication != "") {
                        volume = ", " + meta.volumePublication;
                    }
                    var pages = "";
                    if (meta.pagesPublication != "") {
                        pages = ", " + meta.pagesPublication;
                    }
                    this.publication = volume + pages + year; 
                    this.meta = meta;
            });     
    });
   },

    downloadPdf: function() {
      var pdfDoc = new jsPDF('p', 'mm', 'a4');
      var el = this.$refs.metadata;
      pdfDoc.fromHTML(el, 10, 10, {'width': 180});
      pdfDoc.save("metadata.pdf");
    }
  }
}
</script>

<style>

.aeris-eccad-color-label {
    font-weight: normal;
    color: navy;
    width: 78px;
    min-width: 78px;
    max-width: 78px;
    display: inline-block;
}
.aeris-eccad-color-list {
    display: inline-block;
}

.aeris-eccad-color-list > select {
   width: 120px;
}
	
</style>