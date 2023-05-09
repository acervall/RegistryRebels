import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import HomeViewUser from './views/HomeViewUser.vue'
import GreetingCheckoutView from './views/GreetingCheckoutView.vue'


export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/',
    },
    {
      component: HomeViewUser,
      path: '/home/user',
    },
    {
      component: GreetingCheckoutView,
      path: '/checkout',
    },
  ],
})
