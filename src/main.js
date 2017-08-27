import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n);

import vueSlider from 'vue-slider-component'
Vue.use(vueSlider);

import VueResource from 'vue-resource';
Vue.use(VueResource);

export const EventBus = new Vue();

import AerisEccadCategory from './aeris-eccad-listbox/aeris-eccad-category/aeris-eccad-category.vue'
import AerisEccadParameter from './aeris-eccad-listbox/aeris-eccad-parameter/aeris-eccad-parameter.vue'
import AerisEccadDataset from './aeris-eccad-listbox/aeris-eccad-dataset/aeris-eccad-dataset.vue'
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

import AerisEccadSelection from './aeris-eccad-selection/aeris-eccad-selection.vue'
import AerisEccadApp from './aeris-eccad-app/aeris-eccad-app.vue'

Vue.customElement('aeris-eccad-category',AerisEccadCategory);
Vue.customElement('aeris-eccad-parameter',AerisEccadParameter);
Vue.customElement('aeris-eccad-dataset',AerisEccadDataset);
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


Vue.customElement('aeris-eccad-selection',AerisEccadSelection);
Vue.customElement('aeris-eccad-app',AerisEccadApp);
