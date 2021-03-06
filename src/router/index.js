import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Home from '../pages/Home.vue'
import Home2 from '../pages/Home2.vue'
import HomeDec from '../pages/HomeDec.vue'
import HomePC from '../pages/HomePC.vue'
import HomeTest from '../pages/HomeTest.vue'
import NineNew from '../pages/nineNew.vue'


import RegisterPhone from '../pages/RegisterPhone.vue'
import RegisterPhone2 from '../pages/RegisterPhone2.vue'
import RegisterPhoneDec from '../pages/RegisterPhoneDec.vue'
import RegisterPhoneTest from '../pages/RegisterPhoneTest.vue'
import RegisterPhoneNineNew from '../pages/RegisterPhoneNineNew.vue'
import PayPc from '../pages/PayPC.vue'

import Coder from '../pages/code.vue'
import CodePC from '../pages/CodePC.vue'
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
          name: 'homeDec',
          path: '/homeDec',
          component: HomeDec
        },
        {
          name: 'registerPhoneDec',
          path: '/registerPhoneDec',
          component: RegisterPhoneDec
        },
        {
          name: 'homePC',
          path: '/homePC',
          component: HomePC
        },
        {
          name: 'payPc',
          path: '/payPc',
          component: PayPc
        },
        {
          name: 'homeTest',
          path: '/homeTest',
          component: HomeTest
        },
        {
          name: 'registerPhoneTest',
          path: '/registerPhoneTest',
          component: RegisterPhoneTest
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
        },
        {
          name: 'codePC',
          path: '/codePC',
          component: CodePC
        },
        {
          name: 'nineNew',
          path: '/nineNew',
          component: NineNew
        },
        {
          name: 'registerPhoneNineNew',
          path: '/registerPhoneNineNew',
          component: RegisterPhoneNineNew
        }
      ]
    }
  ]
})
