import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Else from './views/anythingElse.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/',
      name: 'else',
      component: Else
    }
  ]
})