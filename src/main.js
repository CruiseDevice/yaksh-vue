// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/modules'
import moment from 'moment'
import * as filters from './filter'

Vue.prototype.moment = moment
Vue.use(BootstrapVue)

Vue.config.productionTip = false

for (const key in filters) {
  Vue.filter(key, filters[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
