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
import AerisEccadSelection from './aeris-eccad-selection/aeris-eccad-selection.vue'
import AerisEccadDashBoard from './aeris-eccad-dashboard/aeris-eccad-dashboard.vue'

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
Vue.customElement('aeris-eccad-header',AerisEccadHeader);
Vue.customElement('aeris-eccad-selection',AerisEccadSelection);
Vue.customElement('aeris-eccad-dashboard',AerisEccadDashBoard);

