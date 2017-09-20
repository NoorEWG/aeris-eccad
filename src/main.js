import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n);

import vueSlider from 'vue-slider-component'
Vue.use(vueSlider);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDZ0hIZWHMfwK4eyn6uqNi7X-40NNDxBZU',
    libraries: 'places',    
  }
});

export const EventBus = new Vue();

import AerisEccadCategory from './aeris-eccad-listbox/aeris-eccad-category/aeris-eccad-category.vue'
import AerisEccadParameter from './aeris-eccad-listbox/aeris-eccad-parameter/aeris-eccad-parameter.vue'
import AerisEccadDataset from './aeris-eccad-listbox/aeris-eccad-dataset/aeris-eccad-dataset.vue'
import AerisEccadInventory from './aeris-eccad-listbox/aeris-eccad-dataset/aeris-eccad-inventory.vue'
import AerisEccadScenario from './aeris-eccad-listbox/aeris-eccad-scenario/aeris-eccad-scenario.vue'
import AerisEccadSector from './aeris-eccad-listbox/aeris-eccad-sector/aeris-eccad-sector.vue'
import AerisEccadDate from './aeris-eccad-listbox/aeris-eccad-date/aeris-eccad-date.vue'
import AerisEccadRbUnit from './aeris-eccad-button/aeris-eccad-unit/aeris-eccad-rb-unit.vue'
import AerisEccadBarchart from './aeris-eccad-chart/aeris-eccad-barchart/aeris-eccad-barchart.vue'
import AerisEccadCatalog from './aeris-eccad-catalog/aeris-eccad-catalog.vue'
import AerisEccadHeader from './aeris-eccad-header/aeris-eccad-header.vue'
import AerisEccadMap from './aeris-eccad-map/aeris-eccad-map.vue'
import AerisEccadMainMenu from './aeris-eccad-menu/aeris-eccad-mainmenu.vue'
import AerisEccadCatalogMenu from './aeris-eccad-menu/aeris-eccad-catalogmenu.vue'
import AerisEccadToolsMenu from './aeris-eccad-menu/aeris-eccad-toolsmenu.vue'
import AerisEccadDashBoard from './aeris-eccad-dashboard/aeris-eccad-dashboard.vue'
import AerisEccadMask from './aeris-eccad-listbox/aeris-eccad-mask/aeris-eccad-mask.vue'
import AerisEccadColor from './aeris-eccad-listbox/aeris-eccad-color/aeris-eccad-color.vue'
import AerisEccadGeospatial from './aeris-eccad-listbox/aeris-eccad-geospatial/aeris-eccad-geospatial.vue'
import AerisEccadBbox from './aeris-eccad-bbox/aeris-eccad-bbox.vue'
import AerisEccadScatterplot from './aeris-eccad-chart/aeris-eccad-scatterplot/aeris-eccad-scatterplot.vue'
import AerisEccadRange from './aeris-eccad-listbox/aeris-eccad-range/aeris-eccad-range.vue'
import AerisEccadScale from './aeris-eccad-listbox/aeris-eccad-scale/aeris-eccad-scale.vue'
import AerisEccadNumcolors from './aeris-eccad-listbox/aeris-eccad-numcolors/aeris-eccad-numcolors.vue'
import AerisEccadMin from './aeris-eccad-minmax/aeris-eccad-min.vue'
import AerisEccadMax from './aeris-eccad-minmax/aeris-eccad-max.vue'
import AerisEccadResetCompare from './aeris-eccad-button/aeris-eccad-reset/aeris-eccad-compare.vue'
import AerisEccadCompareBox from './aeris-eccad-comparebox/aeris-eccad-comparebox.vue'
import AerisEccadDrawButtons from './aeris-eccad-button/aeris-eccad-draw/aeris-eccad-draw.vue'
import AerisEccadDownload from './aeris-eccad-download/aeris-eccad-download.vue'
import AerisEccadResolution from './aeris-eccad-listbox/aeris-eccad-resolution/aeris-eccad-resolution.vue'
import AerisEccadMetadata from './aeris-eccad-metadata/aeris-eccad-metadata.vue'
import AerisEccadTemporalChart from './aeris-eccad-chart/aeris-eccad-temporal/aeris-eccad-temporal.vue'
import AerisEccadEmissionTSChart from './aeris-eccad-chart/aeris-eccad-emissionts/aeris-eccad-etschart.vue'
import AerisEccadEmissionTS from './aeris-eccad-emissionts/aeris-eccad-emissionts.vue'
import AerisEccadInventoryTSChart from './aeris-eccad-chart/aeris-eccad-inventoryts/aeris-eccad-itschart.vue'
import AerisEccadInventoryTS from './aeris-eccad-inventoryts/aeris-eccad-inventoryts.vue'
import AerisEccadLogin from './aeris-eccad-login/aeris-eccad-login.vue'
import AerisEccadSpecies from './aeris-eccad-species/aeris-eccad-species.vue'
import AerisEccadCatalogSector from './aeris-eccad-catalog-sector/aeris-eccad-catalog-sector.vue'
import AerisEccadCatalogScenario from './aeris-eccad-catalog-scenario/aeris-eccad-catalog-scenario.vue'
import AerisEccadGeoMap from './aeris-eccad-map/aeris-eccad-geo-map.vue'
import AerisEccadSelection from './aeris-eccad-selection/aeris-eccad-selection.vue'
import AerisEccadApp from './aeris-eccad-app/aeris-eccad-app.vue'

Vue.customElement('aeris-eccad-category',AerisEccadCategory);
Vue.customElement('aeris-eccad-parameter',AerisEccadParameter);
Vue.customElement('aeris-eccad-dataset',AerisEccadDataset);
Vue.customElement('aeris-eccad-inventory',AerisEccadInventory);
Vue.customElement('aeris-eccad-scenario',AerisEccadScenario);
Vue.customElement('aeris-eccad-sector',AerisEccadSector);
Vue.customElement('aeris-eccad-rb-unit',AerisEccadRbUnit);
Vue.customElement('aeris-eccad-barchart',AerisEccadBarchart);
Vue.customElement('aeris-eccad-catalog',AerisEccadCatalog);
Vue.customElement('aeris-eccad-date',AerisEccadDate);
Vue.customElement('aeris-eccad-map',AerisEccadMap);
Vue.customElement('aeris-eccad-mainmenu',AerisEccadMainMenu);
Vue.customElement('aeris-eccad-catalogmenu',AerisEccadCatalogMenu);
Vue.customElement('aeris-eccad-toolsmenu',AerisEccadToolsMenu);
Vue.customElement('aeris-eccad-header',AerisEccadHeader);
Vue.customElement('aeris-eccad-dashboard',AerisEccadDashBoard);
Vue.customElement('aeris-eccad-mask',AerisEccadMask);
Vue.customElement('aeris-eccad-color',AerisEccadColor);
Vue.customElement('aeris-eccad-geospatial',AerisEccadGeospatial);
Vue.customElement('aeris-eccad-bbox',AerisEccadBbox);
Vue.customElement('aeris-eccad-scatterplot',AerisEccadScatterplot);
Vue.customElement('aeris-eccad-range',AerisEccadRange);
Vue.customElement('aeris-eccad-scale',AerisEccadScale);
Vue.customElement('aeris-eccad-numcolors',AerisEccadNumcolors);
Vue.customElement('aeris-eccad-min',AerisEccadMin);
Vue.customElement('aeris-eccad-max',AerisEccadMax);
Vue.customElement('aeris-eccad-reset-compare',AerisEccadResetCompare);
Vue.customElement('aeris-eccad-comparebox',AerisEccadCompareBox);
Vue.customElement('aeris-eccad-drawbuttons',AerisEccadDrawButtons);
Vue.customElement('aeris-eccad-download',AerisEccadDownload);
Vue.customElement('aeris-eccad-resolution',AerisEccadResolution);
Vue.customElement('aeris-eccad-metadata',AerisEccadMetadata);
Vue.customElement('aeris-eccad-temporalchart',AerisEccadTemporalChart);
Vue.customElement('aeris-eccad-emissiontschart',AerisEccadEmissionTSChart);
Vue.customElement('aeris-eccad-emissionts',AerisEccadEmissionTS);
Vue.customElement('aeris-eccad-inventorytschart',AerisEccadInventoryTSChart);
Vue.customElement('aeris-eccad-inventoryts',AerisEccadInventoryTS);
Vue.customElement('aeris-eccad-login',AerisEccadLogin);
Vue.customElement('aeris-eccad-species',AerisEccadSpecies);
Vue.customElement('aeris-eccad-catalog-sector',AerisEccadCatalogSector);
Vue.customElement('aeris-eccad-catalog-scenario',AerisEccadCatalogScenario);
Vue.customElement('aeris-eccad-geo-map',AerisEccadGeoMap);


Vue.customElement('aeris-eccad-selection',AerisEccadSelection);
Vue.customElement('aeris-eccad-app',AerisEccadApp);
