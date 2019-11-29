import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Home from '../pages/Home.vue'
import Home2 from '../pages/Home2.vue'
import RegisterPhone from '../pages/RegisterPhone.vue'
import RegisterPhone2 from '../pages/RegisterPhone2.vue'
import Coder from '../pages/code.vue'
import NiceCode from '../pages/NiceCode.vue'
import NiceHome from '../pages/NiceHome.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
          name: 'home2',
          path: '/home2',
          component: Home2
        },
        {
          name: 'registerPhone2',
          path: '/registerPhone2',
          component: RegisterPhone2
        },
        {
          name: 'coder',
          path: '/coder',
          component: Coder
        },
        {
          name: 'nicehome',
          path: '/nicehome',
          component: NiceHome
        },
        {
          name: 'nicecode',
          path: '/nicecode',
          component: NiceCode
        }
      ]
    }
  ]
})
