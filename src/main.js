import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import store from './store';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
// import echarts from 'echarts';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Trend from "vuetrend"
import http from './plugins/http.js'
import StorageManipulatorPlugin from './plugins/storageManipulator';

import { router } from './router';
import myFunctions from './utilities';

// import myFunctions from './utilities';

Vue.prototype.axios = axios;
Vue.use(http)
Vue.use(StorageManipulatorPlugin);
Vue.use(VueSidebarMenu);
Vue.use(VueRouter);
Vue.use(Trend)
Vue.mixin({
  methods: { ...myFunctions }
});
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
