import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {Tab, Tabs,List,Cell } from './assets/vant.min.js'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:require('./assets/loading.jpg'),
  error:require('./assets/error.jpg'),
})

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Cell);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
