import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Home from '../pages/Home.vue'
import RegisterPhone from '../pages/RegisterPhone.vue'
import Coder from '../pages/code.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: App,
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home
        },
        {
          name: 'registerPhone',
          path: '/registerPhone',
          component: RegisterPhone
        },
        {
          name: 'coder',
          path: '/coder',
          component: Coder
        }
      ]
    }
  ]
})
