import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import HomeViewUser from './views/HomeViewUser.vue'
import GreetingCheckoutView from './views/GreetingCheckoutView.vue'
import RsvpView from './views/RsvpView.vue'
import UserSignupView from './views/UserSignupView.vue'
import UserSigninView from './views/UserSigninView.vue'
import UserHomeView from './views/UserHomeView.vue'
import UserListView from './views/UserListView.vue'
import UserListsOverView from './views/UserListsOverView.vue'
import UserGuestOverView from './views/UserGuestOverView.vue'
import UserGuestFoodView from './views/UserGuestFoodView.vue'
import UserListAddView from './views/UserListAddView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/',
    },
    /* SKA BORT */
    {
      component: HomeViewUser,
      path: '/home/user',
    },
    /*  */
    {
      component: GreetingCheckoutView,
      path: '/checkout',
    },
    {
      component: RsvpView,
      path: '/rsvp',
    },
    {
      component: UserSignupView,
      path: '/signup',
    },
    {
      component: UserSigninView,
      path: '/signin',
    },
    {
      component: UserHomeView,
      path: '/userhome',
    },

    {
      component: UserListsOverView,
      path: '/userlistsoverview',
    },
    {
      component: UserListView,
      path: '/userlist/:id',
    },
    {
      component: UserGuestOverView,
      path: '/UserGuestOverView',
    },
    {
      component: UserGuestFoodView,
      path: '/UserGuestFoodView',
    },
    {
      component: UserListAddView,
      path: '/userlistadd',
    },
  ],
})
