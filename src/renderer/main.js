import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-dark.css'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
