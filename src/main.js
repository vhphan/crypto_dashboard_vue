import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import store from './store';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
// import echarts from 'echarts';
// import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-select';
// import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import { router } from './router';
// import myFunctions from './utilities';
// import AsyncComputed from 'vue-async-computed';

// Vue.use(AsyncComputed);
Vue.use(VueSidebarMenu);
Vue.use(VueRouter);
Vue.config.productionTip = false;
// Vue.mixin({
//   methods: { ...myFunctions }
// });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
