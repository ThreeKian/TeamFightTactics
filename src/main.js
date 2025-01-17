import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueRouter from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(iView)
Vue.prototype.$Message.config({
  top: 60,
  duration: 1.5
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
