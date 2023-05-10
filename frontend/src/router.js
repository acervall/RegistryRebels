import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import HomeViewUser from './views/HomeViewUser.vue'
import GreetingCheckoutView from './views/GreetingCheckoutView.vue'
import RsvpView from './views/RsvpView.vue'
import SignupView from './views/SignupView.vue'
import SigninView from './views/SigninView.vue'
import UserHomeView from './views/UserHomeView.vue'
import UserListView from './views/UserListView.vue'

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
    {
      component: RsvpView,
      path: '/rsvp',
    },
    {
      component: SignupView,
      path: '/signup',
    },
    {
      component: SigninView,
      path: '/signin',
    },
    {
      component: UserHomeView,
      path: '/userhome',
    },
    {
      component: UserListView,
      path: '/userlist',
    },
  ],
})
